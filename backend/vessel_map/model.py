import torch
import torch.nn as nn
import torch.nn.functional as F

# === DropBlock2D ===
class DropBlock2D(nn.Module):
    def __init__(self, block_size, drop_prob):
        super(DropBlock2D, self).__init__()
        self.block_size = block_size
        self.drop_prob = drop_prob

    def forward(self, x):
        if not self.training or self.drop_prob == 0.0:
            return x

        gamma = self._compute_gamma(x)
        B, C, H, W = x.shape
        mask = (torch.rand(B, 1, H, W, device=x.device) < gamma).float()
        block_mask = F.max_pool2d(mask, self.block_size, stride=1, padding=self.block_size // 2)
        block_mask = 1 - block_mask
        out = x * block_mask
        out = out * (block_mask.numel() / block_mask.sum().clamp(min=1.0))
        return out

    def _compute_gamma(self, x):
        _, _, h, w = x.size()
        return self.drop_prob / (self.block_size ** 2) * (h * w) / ((h - self.block_size + 1) * (w - self.block_size + 1))

# === Res2Block ===
class Res2Block(nn.Module):
    def __init__(self, in_channels, out_channels, scale=4):
        super(Res2Block, self).__init__()
        self.scale = scale
        width = out_channels // scale
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=1, bias=False)
        self.bn1 = nn.BatchNorm2d(out_channels)

        self.convs = nn.ModuleList([
            nn.Conv2d(width, width, kernel_size=3, padding=1, bias=False) for _ in range(scale - 1)
        ])
        self.bns = nn.ModuleList([
            nn.BatchNorm2d(width) for _ in range(scale - 1)
        ])

        self.conv3 = nn.Conv2d(out_channels, out_channels, kernel_size=1, bias=False)
        self.bn3 = nn.BatchNorm2d(out_channels)
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x):
        out = self.relu(self.bn1(self.conv1(x)))
        spx = list(torch.chunk(out, self.scale, dim=1))
        for i in range(1, self.scale):
            spx[i] = self.relu(self.bns[i - 1](self.convs[i - 1](spx[i] + spx[i - 1])))
        out = torch.cat(spx, dim=1)
        out = self.bn3(self.conv3(out))
        return self.relu(out)

# === Spatial Attention ===
class SpatialAttention(nn.Module):
    def __init__(self):
        super(SpatialAttention, self).__init__()

    def forward(self, x):
        A = torch.sum(x, dim=1, keepdim=True)
        flat = A.view(A.size(0), -1)
        softmax = F.softmax(flat, dim=-1)
        P = softmax.view_as(A)
        return x * P

# === Position Attention Module (PAM) ===
class PAM(nn.Module):
    def __init__(self, in_channels):
        super(PAM, self).__init__()
        self.query_conv = nn.Conv2d(in_channels, in_channels // 8, kernel_size=1)
        self.key_conv = nn.Conv2d(in_channels, in_channels // 8, kernel_size=1)
        self.value_conv = nn.Conv2d(in_channels, in_channels, kernel_size=1)
        self.gamma = nn.Parameter(torch.zeros(1))

    def forward(self, x):
        B, C, H, W = x.size()
        proj_query = self.query_conv(x).view(B, -1, H * W).permute(0, 2, 1)
        proj_key = self.key_conv(x).view(B, -1, H * W)
        energy = torch.bmm(proj_query, proj_key)
        attention = F.softmax(energy, dim=-1)
        proj_value = self.value_conv(x).view(B, -1, H * W)
        out = torch.bmm(proj_value, attention.permute(0, 2, 1))
        out = out.view(B, C, H, W)
        return self.gamma * out + x

# === Channel Attention Module (CAM) ===
class CAM(nn.Module):
    def __init__(self, in_channels):
        super(CAM, self).__init__()
        self.gamma = nn.Parameter(torch.zeros(1))

    def forward(self, x):
        B, C, H, W = x.size()
        proj_query = x.view(B, C, -1)
        proj_key = x.view(B, C, -1).permute(0, 2, 1)
        energy = torch.bmm(proj_query, proj_key)
        attention = F.softmax(energy, dim=-1)
        proj_value = x.view(B, C, -1)
        out = torch.bmm(attention, proj_value).view(B, C, H, W)
        return self.gamma * out + x

# === DA-Res2UNet ===
class DARes2UNet(nn.Module):
    def __init__(self):
        super(DARes2UNet, self).__init__()
        self.enc1 = nn.Sequential(Res2Block(3, 16), DropBlock2D(7, 0.1))
        self.pool1 = nn.MaxPool2d(2)

        self.enc2 = nn.Sequential(Res2Block(16, 32), DropBlock2D(7, 0.1))
        self.pool2 = nn.MaxPool2d(2)

        self.enc3 = nn.Sequential(Res2Block(32, 64), DropBlock2D(7, 0.1))
        self.pool3 = nn.MaxPool2d(2)

        self.enc4 = nn.Sequential(Res2Block(64, 128), DropBlock2D(7, 0.1))

        self.pam = PAM(128)
        self.cam = CAM(128)
        self.sa = SpatialAttention()

        self.up3 = nn.ConvTranspose2d(128, 64, kernel_size=2, stride=2)
        self.dec3 = Res2Block(128, 64)

        self.up2 = nn.ConvTranspose2d(64, 32, kernel_size=2, stride=2)
        self.dec2 = Res2Block(64, 32)

        self.up1 = nn.ConvTranspose2d(32, 16, kernel_size=2, stride=2)
        self.dec1 = Res2Block(32, 16)

        self.final = nn.Conv2d(16, 1, kernel_size=1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        e1 = self.enc1(x)
        e2 = self.enc2(self.pool1(e1))
        e3 = self.enc3(self.pool2(e2))
        e4 = self.enc4(self.pool3(e3))

        att = self.sa(self.pam(self.cam(e4)))

        d3 = self.up3(att)
        d3 = self.dec3(torch.cat([d3, e3], dim=1))

        d2 = self.up2(d3)
        d2 = self.dec2(torch.cat([d2, e2], dim=1))

        d1 = self.up1(d2)
        d1 = self.dec1(torch.cat([d1, e1], dim=1))

        return self.sigmoid(self.final(d1))

import sys
import os

# Add StyleGAN3 repo to the Python path
sys.path.append('./stylegan3')

import torch
import numpy as np
from PIL import Image
import legacy  # from StyleGAN3's repo


# === Load Pre-trained StyleGAN3 Generator ===
def load_generator(model_path: str, device: str = 'cuda'):
    """
    Loads a StyleGAN3 generator from a .pkl checkpoint.

    Args:
        model_path: Path to the .pkl file.
        device: 'cuda' or 'cpu'.

    Returns:
        G: The EMA generator on the target device.
    """
    with open(model_path, 'rb') as f:
        G = legacy.load_network_pkl(f)['G_ema'].to(device)  # EMA copy
    G.eval()
    return G


# === Generate Synthetic Images ===
def generate_images(
    G,
    num_images: int = 10,
    truncation: float = 1.0,
    seed_start: int = None,
    device: str = 'cuda'
):
    """
    Generates a batch of images from a StyleGAN3 generator.

    Args:
        G: Loaded generator model.
        num_images: Number of images to generate.
        truncation: Truncation psi value (1.0 = no truncation).
        seed_start: Starting random seed (random if None).
        device: 'cuda' or 'cpu'.

    Returns:
        List of PIL.Image objects.
    """
    if seed_start is None:
        seed_start = np.random.randint(0, 10000)

    images = []
    for seed in range(seed_start, seed_start + num_images):
        # Latent vector
        z = torch.from_numpy(
            np.random.RandomState(seed).randn(1, G.z_dim)
        ).to(device)

        # Unconditional models ignore label; pass a zero-sized tensor
        label = torch.zeros([1, G.c_dim], device=device)

        # Generate image tensor
        img_tensor = G(z, label, truncation_psi=truncation, noise_mode='const')[0]

        # Convert to PIL.Image
        img = (img_tensor.permute(1, 2, 0) * 127.5 + 128)
        img = img.clamp(0, 255).to(torch.uint8).cpu().numpy()
        images.append(Image.fromarray(img, 'RGB'))

    return images


# === Main: generate for both DR and no-DR models ===
def main():
    # Paths to your separate checkpoints
    no_dr_path = './generation/no_dr_model.pkl'
    dr_path    = './generation/dr_model.pkl'

    # Output directories
    out_dir = 'output'
    os.makedirs(os.path.join(out_dir, 'no_dr'), exist_ok=True)
    os.makedirs(os.path.join(out_dir, 'dr'), exist_ok=True)

    # Load generators
    G_no_dr = load_generator(no_dr_path)
    G_dr    = load_generator(dr_path)

    # Generate images
    no_dr_images = generate_images(G_no_dr, num_images=5, truncation=1.0, seed_start=0)
    dr_images    = generate_images(G_dr,    num_images=5, truncation=1.0, seed_start=100)

    # Save images to disk
    for i, img in enumerate(no_dr_images):
        img.save(os.path.join(out_dir, 'no_dr', f'no_dr_{i:02d}.png'))

    for i, img in enumerate(dr_images):
        img.save(os.path.join(out_dir, 'dr',    f'dr_{i:02d}.png'))

    print(f"Generated {len(no_dr_images)} no-DR images and {len(dr_images)} DR images.")


if __name__ == '__main__':
    main()

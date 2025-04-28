# Fundus Vessel Segmentation with DA-Res2UNet

This repository presents a **custom vessel segmentation model** designed to accurately extract retinal vessel structures from **fundus images**. The model leverages a **DA-Res2UNet architecture**, combining **Res2Blocks**, **DropBlock regularization**, and **Dual Attention mechanisms (PAM + CAM)** to achieve high segmentation performance.

---

## 🏗️ Model Architecture: DA-Res2UNet

DA-Res2UNet is a **U-Net-inspired encoder-decoder architecture** enhanced with the following components:

### 🔍 Key Components:

1. **Res2Blocks**:
   - Multi-scale residual blocks that split feature maps into groups and process them at different receptive fields, enhancing multi-scale feature extraction.
   - Includes **Batch Normalization** and **ReLU activation** after each convolution.
   
2. **DropBlock Regularization**:
   - A structured form of dropout that drops contiguous regions in feature maps, encouraging spatial regularization.

3. **Dual Attention Mechanisms**:
   - **Position Attention Module (PAM)**: Captures spatial dependencies across the feature maps.
   - **Channel Attention Module (CAM)**: Captures inter-channel dependencies.

4. **Spatial Attention**:
   - Further refines feature maps by focusing on the most informative spatial regions.

5. **Decoder with Skip Connections**:
   - Incorporates **upsampling layers** followed by **Res2Blocks** and skip connections from the encoder, facilitating better gradient flow and feature reuse.

6. **Output**:
   - Final **1×1 convolution layer** with **sigmoid activation** outputs the vessel mask.

---

## ⚙️ Training Configuration

- **Dataset**:
  - Preprocessed fundus images and vessel masks resized to **256×256**.
  - Normalization using **Z-score standardization** on images.
  - Masks normalized to binary `[0, 1]`.

- **Loss Function**: `Binary Cross-Entropy Loss (BCELoss)`  
- **Optimizer**: `Adam` with an initial learning rate of **0.01**  
- **Scheduler**: `CosineAnnealingLR` with `T_max=40` epochs  
- **Batch Size**: `8`  
- **Epochs**: `100`  
- **Hardware**: Trained on **GPU (CUDA)**  

---

## 🎯 Evaluation Metrics

The model was evaluated on a separate **test set** of fundus images with the following **segmentation performance**:

| Metric       | Value    |
|--------------|----------|
| **Dice Coefficient** | **84.25%** |
| **Accuracy**         | **98.05%** |
| **Sensitivity (Recall)** | **79.91%** |
| **Specificity**      | **99.32%** |

---

## 📊 Preprocessing Pipeline

1. **Image Sourcing**:
   - Fundus images and vessel masks collected from multiple retinal datasets.

2. **Image Preprocessing**:
   - **Z-score normalization** applied to RGB images.
   - Vessel masks binarized to `[0, 1]`.
   - Resized to **256×256** resolution.

3. **Training/Testing Split**:
   - Split into **training** and **testing** sets with consistent preprocessing.

---

## 🚀 Inference Example

```python
# Load custom fundus image and preprocess
img = cv2.imread('custom_fundus.png').astype(np.float32)
img = (img - img.mean()) / (img.std() + 1e-8)
img = np.transpose(img, (2, 0, 1))  # HWC → CHW
img = torch.tensor(img).unsqueeze(0).to(device)

# Predict vessel mask
with torch.no_grad():
    pred = model(img).cpu().numpy()[0, 0]  # [batch, channel, H, W] → [H, W]

# Save prediction
cv2.imwrite('predicted_mask.png', (pred * 255).astype(np.uint8))



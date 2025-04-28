# Fundus Image Generation with StyleGAN3 (DR vs No_DR)

This repository presents two **StyleGAN3-based generative models** trained to synthesize **realistic fundus images** for **Diabetic Retinopathy (DR)** and **No_DR (healthy)** classes. These models are designed to **augment datasets** for downstream tasks like DR classification, segmentation, and research.

---

## 🎯 Objectives

- **Generate high-quality synthetic fundus images** for both DR and No_DR classes.  
- Enhance dataset diversity and reduce overfitting for machine learning models.  
- Provide **pretrained models** for **further fine-tuning** and **research use**.

---

## 🧠 Why StyleGAN3?

- **StyleGAN3** offers **state-of-the-art image generation** capabilities with **alias-free architectures** that ensure smooth and stable high-resolution outputs.  
- It improves upon **StyleGAN2** by addressing **aliasing artifacts**, which is crucial for medical imaging where **fine details matter**.

Reference:  
- **StyleGAN3 Paper**: [https://arxiv.org/abs/2106.12423](https://arxiv.org/abs/2106.12423)  
- **Official GitHub Repo**: [https://github.com/NVlabs/stylegan3](https://github.com/NVlabs/stylegan3)

---

## 🏗️ Model Architecture

- **Base Architecture**: `StyleGAN3-t` (time-invariant model for generating consistent textures).  
- **Latent Vector (Z) Dimension**: `512`  
- **Mapping Network Layers**: `2`  
- **Resolution**: `512x512` fundus images  
- **Channel Base**: `32768`, **Channel Max**: `512`  
- **Regularization**: ADA (adaptive discriminator augmentation) for preventing overfitting.

---

## ⚙️ Training Configuration

- **DR Model Parameters**:
  - **Batch Size**: `32`
  - **Gamma**: `8.2`
  - **Learning Rate**: Generator: `0.0025`, Discriminator: `0.002`
  - **Augmentation**: ADA

- **No_DR Model Parameters**:
  - **Batch Size**: `32`
  - **Gamma**: `8.2`
  - **Learning Rate**: Generator: `0.0025`, Discriminator: `0.002`
  - **Augmentation**: ADA

- **Truncation**: `1.0` (to retain full diversity in generated images)  
- **Hardware**: Trained on **NVIDIA A100 GPUs** via **Google Colab Pro+**

---

## 🧹 Preprocessing Pipeline

- **Datasets Used**:  
  - **DR Images**: Collected from **EyePACS**, **DDR**, **APTOS**, **IDRiD** datasets.  
  - **No_DR Images**: Same datasets, filtered for healthy fundus images.

- **Preprocessing Steps**:
  - **Image Quality Filtering**: Ensured images have **clear retinal features**, no blur, glare, or low contrast.
  - **Resolution**: Resized all images to **512x512**.
  - **Normalization**: Pixel values scaled to `[-1, 1]` for compatibility with StyleGAN3.
  - **Left-eye flipping**: Standardized orientation across datasets.

---

## 📊 Results

- **FID (Fréchet Inception Distance) Scores**:
  - **No_DR Model**: `23.29`
  - **DR Model**: `18.97`

Lower **FID scores** indicate **better similarity** between generated and real images.

### 👨‍⚕️ Expert Evaluation

- **Three ophthalmologists** reviewed a random selection of **100 generated images** (50 DR, 50 No_DR).  
- **Conclusion**:  
  - Confirmed the **realism** of key retinal features:
    - For **DR images**: Presence of **hemorrhages**, **exudates**, and **vascular abnormalities**.
    - For **No_DR images**: Healthy **optic disc**, **macula**, and **vascular structures**.

---

## 🏁 Pretrained Models

The following pretrained weights are attached for **further fine-tuning** or **image generation**:

- **No_DR Model**: `no_dr_model.pkl`
- **DR Model**: `dr_model.pkl`

---

## 🚀 Usage Example

```bash
# Generate images using pretrained model
python gen_images.py \
  --outdir=out_images \
  --trunc=1.0 \
  --seeds=0-49 \
  --network=no_dr_model.pkl

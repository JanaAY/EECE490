# Diabetic Retinopathy Detection Model (First Approach)

This repository presents the **first version** of a Diabetic Retinopathy (DR) detection model, developed and trained on preprocessed fundus images. The model uses **RETFound_MAE**, a Vision Transformer-based architecture, fine-tuned for binary classification (**DR vs No_DR**). 

---

## 📁 Dataset Preprocessing

### 1. Dataset Structure
- **Source Directories**:
  - `/All_NoDR_Images_Processed_Balanced`
  - `/All_DR_Images_Processed_Balanced`

### 2. Preprocessing Steps
- **Counting Images**: Verified image counts in each class.
- **Resizing**: All images resized to **256×256** using bicubic interpolation.
  - Output:
    - `/All_NoDR_Images_Resized`
    - `/All_DR_Images_Resized`
- **Splitting**: 70% training, 10% validation, 20% testing.
  - Structure:
    ```
    RETFound_Split/
    ├── train/
    │   ├── dr/
    │   └── no_dr/
    ├── val/
    │   ├── dr/
    │   └── no_dr/
    └── test/
        ├── dr/
        └── no_dr/
    ```
- **Data Augmentation**:
  - Applied **RandomResizedCrop (224×224)** and **RandomHorizontalFlip**.
  - Augmented images saved in:
    ```
    RETFound_Split_Augmented/
    ├── train/
    ├── val/
    └── test/
    ```
- **Verification**: Confirmed all augmented images are **224×224**.

---

## 🤖 Model Architecture: RETFound_MAE

This project utilizes **[RETFound_MAE](https://huggingface.co/open-eye/RETFound_MAE)**, a **Vision Transformer (ViT-Large)** model pre-trained using **Masked Autoencoding** on large-scale retinal datasets. This allows the model to learn effective representations for retinal fundus images, making it more suitable than generic vision models for eye-related tasks.

### 🔍 Key Features:
- **24 Transformer layers**  
- **Hidden size: 1024**  
- **Patch size: 16×16**  
- **Pretrained for retinal image analysis** using **Masked Autoencoders (MAE)**, as proposed by He et al., 2022 ([Masked Autoencoders Are Scalable Vision Learners](https://arxiv.org/abs/2111.06377))

---

## 🏋️‍♂️ Training Process

- **Platform**: Google Colab (single GPU)  
- **Frameworks**: PyTorch, Hugging Face Transformers  

### 1. Clone & Setup
```bash
git clone https://github.com/rmaphoh/RETFound_MAE.git
cd RETFound_MAE
pip install -r requirement.txt
pip install huggingface_hub
huggingface-cli login

---
## 🔧 Key Hyperparameters

- **Model**: `vit_large_patch16`
- **Epochs**: 80
- **Batch Size**: 16
- **Base Learning Rate**: 5e-3
- **Drop Path Rate**: 0.2
- **Layer-wise LR Decay**: 0.65

---

## 📊 Results

- **Validation Accuracy**: **65%**

Despite leveraging a specialized model architecture and robust preprocessing techniques, the achieved accuracy of **65%** was **not satisfactory**.

---

## 🔧 Planned Improvements

- More aggressive or diverse data augmentation.
- Hyperparameter tuning (e.g., learning rate schedules, weight decay).
- Exploring alternative architectures (e.g., EfficientNet, Swin Transformers) or ensembling models.

---

## 📚 References

- **RETFound_MAE GitHub**: [https://github.com/rmaphoh/RETFound_MAE](https://github.com/rmaphoh/RETFound_MAE)
- **Hugging Face RETFound Model**: [https://huggingface.co/open-eye/RETFound_MAE](https://huggingface.co/open-eye/RETFound_MAE)
- **Masked Autoencoders Paper**: He et al., 2022. ["Masked Autoencoders Are Scalable Vision Learners"](https://arxiv.org/abs/2111.06377)

---

⚠️ **Disclaimer**: This is the **first approach** to training a DR detection model using RETFound_MAE. Further iterations are planned to improve performance.



---






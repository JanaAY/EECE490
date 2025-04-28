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

## 🏗️ Model Architecture (Advanced RSG-Net)

For the **second approach**, we utilized a **custom-built Advanced RSG-Net** architecture designed for **binary classification (DR vs No_DR)**. 

### 🔍 Architecture Overview:

- **Input**: `200x200x3` fundus images  
- **Convolutional Blocks**:
  - **Block 1**:
    - 2x Conv2D layers with **32 filters** each, kernel size `(3,3)`, followed by **ReLU activations** and **L2 regularization (0.001)**.
    - **MaxPooling2D** for downsampling.
  - **Block 2**:
    - 1x Conv2D layer with **64 filters**, followed by another Conv2D with **128 filters**, both with `(3,3)` kernels, **ReLU activations**, and **L2 regularization (0.001)**.
    - **MaxPooling2D** applied.

- **Global Average Pooling**:
  - Reduces spatial dimensions while retaining features.
  
- **Fully Connected Layers**:
  - **Dense Layer** with **128 units**, **ReLU**, **Batch Normalization**, and **Dropout (0.5)**.
  - **Dense Layer** with **64 units**, **ReLU**, and **Dropout (0.3)**.

- **Output Layer**:
  - **Single neuron** with **sigmoid activation** for binary classification (DR vs No_DR).

### 🧪 Why This Architecture?

- **Multi-level feature extraction** through stacked convolutional layers with increasing filter sizes.  
- **Regularization** (L2 penalties + Dropout layers) to prevent overfitting.  
- **Batch Normalization** improves convergence and model stability.  
- Designed to be **lightweight** yet effective for fundus image analysis.

---

## ⚙️ Hyperparameters

- **Input size**: `(200, 200, 3)`
- **Optimizer**: `Adam`
- **Loss Function**: `binary_crossentropy`
- **Metrics**: `accuracy`, `AUC`
- **Batch Size**: `32`
- **Epochs**: `30`
- **Regularization**:
  - **L2 (weight decay)**: `0.001`
  - **Dropout**: `0.5` (Dense 128), `0.3` (Dense 64)

---

## 🧹 Preprocessing Pipeline

- **Image Sourcing**: Combined images from **EyePACS**, **DDR**, **APTOS**, and **IDRiD** datasets.
- **Merging Labels**: Standardized all dataset labels into a unified Excel sheet.
- **Image Cleaning**:
  - Renamed all images with a consistent naming scheme.
  - Resized all images to **200x200**.
  - Applied **Gaussian blurring** and **denoising**.
  - Normalized pixel values to **[-1, 1]**.

- **Dataset Structuring**:
  - Split into **5 classes (0-4)** for DR severity.
  - Applied a **70/10/20 train/val/test split**.

- **Data Augmentation**:
  - Balanced dataset with **7,000 train**, **1,000 val**, **2,000 test** images **per class**.
  - Applied transformations like:
    - **Rotation**, **flipping (horizontal/vertical)**, **zooming**, **brightness**, **color**, **contrast adjustments**.

- **Binary Re-Structuring**:
  - Reorganized for **binary classification**:
    - **Class 0**: Healthy (No_DR).
    - **Class 1**: All DR cases (mild to proliferative).

---

## 📊 Results

- **Validation Accuracy**: **75%**  
- **Compared to First Approach**:
  - Improved from **65%** (first approach using RETFound_MAE) to **75%** with **Advanced RSG-Net**.

---

## 🚧 Limitations & Next Steps

Despite the **10% accuracy boost**, the **75% validation accuracy** is **still suboptimal** for clinical deployment. Further steps needed:

- **Enhancing data augmentation** for better generalization.  
- **Hyperparameter tuning**: Exploring different learning rates, optimizers, and regularization techniques.  
- **Exploring advanced architectures** like:
  - **EfficientNet**, **Swin Transformers**, or **ensemble models**.

---

## 📚 References

1. **EyePACS Dataset**: [https://www.kaggle.com/c/diabetic-retinopathy-detection](https://www.kaggle.com/c/diabetic-retinopathy-detection)
2. **DDR Dataset**: [https://arxiv.org/abs/1812.07041](https://arxiv.org/abs/1812.07041)
3. **APTOS Dataset**: [https://www.kaggle.com/c/aptos2019-blindness-detection](https://www.kaggle.com/c/aptos2019-blindness-detection)
4. **IDRiD Dataset**: [https://ieee-dataport.org/open-access/indian-diabetic-retinopathy-image-dataset-idrid](https://ieee-dataport.org/open-access/indian-diabetic-retinopathy-image-dataset-idrid)

---

⚠️ **Disclaimer**: This is the **second approach** to DR detection using **Advanced RSG-Net**. The model shows improvement but **requires further enhancement** before being considered for **deployment**.





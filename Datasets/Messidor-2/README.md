# 📊 Dataset Overview: Messidor-2 Diabetic Retinopathy Dataset

## 🔍 About the Dataset

For this project, I utilized the **Messidor-2 Diabetic Retinopathy Dataset**, available at [ADCIS](https://www.adcis.net/en/third-party/messidor2/). This dataset is an extension of the original Messidor dataset, providing **high-resolution retinal fundus images** aimed at supporting research on **automated diabetic retinopathy (DR) detection**.

The dataset includes:
- **High-quality fundus images** collected from different medical centers.
- **Retinopathy grades** annotated by medical experts.

**Class distribution** was referenced from the **preprocessed Messidor-2 dataset** on [Kaggle](https://www.kaggle.com/datasets/mariaherrerot/messidor2preprocess).

---

## 📁 Dataset Source

- **Dataset Page:** [ADCIS Messidor-2](https://www.adcis.net/en/third-party/messidor2/)
- **Kaggle Preprocessing Reference:** [Messidor-2 on Kaggle](https://www.kaggle.com/datasets/mariaherrerot/messidor2preprocess)
- **Provided by:** ADCIS and the Messidor Program Partners

_All credit for data collection and preparation goes to the dataset creators. This dataset is used strictly for research and educational purposes._

---

## 🏷️ Diabetic Retinopathy Severity Levels & Class Distribution

| Class | Severity Description            | Image Count |
|-------|---------------------------------|-------------|
| 0     | No diabetic retinopathy (No DR) | 546         |
| 1     | Mild non-proliferative DR       | 153         |
| 2     | Moderate non-proliferative DR   | 247         |
| 3     | Severe non-proliferative DR     | 254         |

_Total images: 1200_

_Reference for distribution: [Messidor-2 on Kaggle](https://www.kaggle.com/datasets/mariaherrerot/messidor2preprocess)_

---

## 🛠️ Preprocessing Pipeline Overview

1. **Merging Annotations:**
   - Combined **annotation Excel sheets** from multiple bases into a **single file** (`Combined_Annotations.xlsx`).

2. **Image Format Conversion:**
   - Converted all **TIFF, PNG, JPG** images to **JPEG** for consistency.

3. **Image Cleaning & Quality Filtering:**
   - Removed low-quality images based on:
     - **Blur detection** (Laplacian variance threshold).
     - **Brightness threshold** (discarded overly dark images).
   - Applied:
     - **Black border removal**.
     - **Annotations/text filtering**.
     - **Glare detection and removal**.
     - **Dark region filtering**.
   - **Auto-flipped left-eye images** for orientation consistency.
   - Enhanced contrast with **CLAHE**.
   - Resized all images to **512x512 pixels** and normalized pixel values to **[-1, 1]**.

4. **Class Distribution Verification:**
   - Ensured all annotations align with the **cleaned image set**.

5. **Dataset Balancing:**
   - Created **binary labels** (`No DR` = 0, `DR` = 1).
   - Performed **undersampling** to balance the dataset.

6. **Organized Dataset Structure:**
   - **Unbalanced Split:**
     - Separated images into:
       - `NoDR/`
       - `DR/`
   - **Balanced Split:**
     - Performed undersampling and split images into:
       - `MBalanced_Split/NoDR/`
       - `MBalanced_Split/DR/`

7. **Generated Annotation Files:**
   - `MtrainLabels_filtered.xlsx` (filtered annotations)
   - `MtrainLabels_balanced.xlsx` (balanced annotations)

---


## 📚 Acknowledgment

I would like to acknowledge **ADCIS** and the **Messidor Program Partners** for providing the **Messidor-2 dataset**, and **Maria Herrero-Toro** for the **Kaggle preprocessed version** used as reference. Their contributions enable research and experimentation in advancing automated diabetic retinopathy detection.


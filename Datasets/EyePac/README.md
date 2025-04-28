# 📊 Dataset Overview: EyePACS - Diabetic Retinopathy Detection Dataset

## 🔍 About the Dataset

For this project, I utilized the **EyePACS Diabetic Retinopathy Detection Dataset**, available on [Kaggle](https://www.kaggle.com/competitions/diabetic-retinopathy-detection). This dataset was released as part of the **Kaggle Diabetic Retinopathy Detection competition** hosted by **EyePACS** and **California Healthcare Foundation** to develop machine learning models capable of identifying **diabetic retinopathy (DR)** severity from **retinal fundus images**.

The dataset comprises **high-resolution retinal images** collected from different patients under varied clinical conditions, reflecting real-world diagnostic challenges. The primary goal is to classify these images into **five stages of DR severity**, supporting early detection and treatment.

---

## 📁 Dataset Source

- **Competition Page:** [Kaggle DR Detection Competition](https://www.kaggle.com/competitions/diabetic-retinopathy-detection)
- **Dataset Files:** [Dataset Download](https://www.kaggle.com/competitions/diabetic-retinopathy-detection/data)
- **Provided by:** EyePACS & California Healthcare Foundation

_All credit for data collection and preparation goes to the dataset creators. This dataset is used strictly for research and educational purposes._

---

## 🏷️ Diabetic Retinopathy Severity Levels & Class Distribution

| Class | Severity Description              |
|-------|-----------------------------------|
| 0     | No diabetic retinopathy (No DR)   |
| 1     | Mild non-proliferative DR         |
| 2     | Moderate non-proliferative DR     |
| 3     | Severe non-proliferative DR       |
| 4     | Proliferative DR                  |

**Class distribution in EyePACS dataset:**

| Class | Description        | Image Count | Percentage (%) |
|-------|--------------------|-------------|----------------|
| 0     | No DR              | 25,810      | 73.48%         |
| 1     | Mild DR            | 2,443       | 6.96%          |
| 2     | Moderate DR        | 5,292       | 15.07%         |
| 3     | Severe DR          | 873         | 2.48%          |
| 4     | Proliferative DR   | 708         | 2.01%          |

_Total images: 35,126_


---

## 🛠️ Preprocessing Pipeline Overview

1. **Kaggle API Integration:**  
   - Downloaded the dataset directly using the **Kaggle API** in **Colab**.

2. **Image Cleaning & Quality Filtering:**  
   - Removed low-quality images based on:
     - **Blur detection** (Laplacian variance threshold).
     - **Brightness threshold** (discarded overly dark images).
   - Removed:
     - **Black borders**.
     - **Annotations/text**.
     - **Glare** (bright white spots).
     - **Dark regions** (poor illumination).
   - **Auto-flipped left-eye images** for orientation consistency.
   - Enhanced contrast with **CLAHE**.
   - Resized all images to **512x512 pixels** and **normalized pixel values** to **[-1, 1]**.

3. **Class Distribution Analysis:**  
   - Verified the **distribution of DR classes** post-cleaning.

4. **Dataset Balancing:**  
   - Created **binary labels** (`No DR` = 0, `DR` = 1).
   - Performed **undersampling** to balance classes.

5. **Organized Dataset Structure:**
   - **Unbalanced Split:**
     - Separated images into:
       - `NoDR/`
       - `DR/`
   - **Balanced Split:**
     - Performed undersampling and split images into:
       - `Balanced_Split/NoDR/`
       - `Balanced_Split/DR/`

6. **Generated CSV Files:**
   - `trainLabels_filtered.csv` (cleaned images)
   - `trainLabels_filtered_unbalanced.csv` (binary labels)
   - `trainLabels_balanced.csv` (balanced dataset)

---

## 📚 Acknowledgment

I would like to acknowledge **EyePACS**, the **California Healthcare Foundation**, and **Kaggle** for providing this valuable dataset. Their contribution enables research and experimentation in advancing automated diabetic retinopathy detection.


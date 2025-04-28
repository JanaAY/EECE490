# 📊 Dataset Overview: APTOS 2019 Blindness Detection

## 🔍 About the Dataset

For this project, I utilized the publicly available **APTOS 2019 Blindness Detection Dataset**, hosted on [Kaggle](https://www.kaggle.com/competitions/aptos2019-blindness-detection). This dataset was released as part of a global competition organized by the **Asia Pacific Tele-Ophthalmology Society (APTOS)**, aiming to advance the field of automated diabetic retinopathy (DR) detection.

The dataset comprises **retinal fundus images** captured using a variety of imaging equipment under varying conditions. These images reflect **real-world clinical variability**, including differences in resolution, lighting, and patient eye conditions (e.g., presence of cataracts), providing a challenging but valuable resource for model development.

The objective is to classify these images into **five distinct levels of diabetic retinopathy severity**, ranging from no DR to advanced proliferative stages. Automated systems trained on this dataset are expected to assist ophthalmologists in **early detection**, **grading**, and **management** of diabetic retinopathy, ultimately reducing the risk of vision loss in diabetic patients.

---

## 📁 Dataset Source

- **Competition Page:** [APTOS 2019 Blindness Detection](https://www.kaggle.com/competitions/aptos2019-blindness-detection)
- **Dataset Files:** [Download Here](https://www.kaggle.com/competitions/aptos2019-blindness-detection/data)
- **Organized by:** Asia Pacific Tele-Ophthalmology Society (APTOS)

All credit for the data collection and preparation goes to APTOS and their partners. This dataset is used solely for educational and research purposes.

---

## 🏷️ Diabetic Retinopathy Severity Levels & Class Distribution

The dataset categorizes each image into **five severity levels**:

| Class | Severity Description              |
|-------|-----------------------------------|
| 0     | No diabetic retinopathy (No DR)   |
| 1     | Mild non-proliferative DR         |
| 2     | Moderate non-proliferative DR     |
| 3     | Severe non-proliferative DR       |
| 4     | Proliferative DR                  |

> In diabetic retinopathy, **early stages** may present with microaneurysms, while **advanced stages** (proliferative DR) involve abnormal new blood vessel growth, posing a risk of severe vision loss.

### ⚖️ **Dataset Class Distribution:**

The dataset is **imbalanced**, reflecting the natural prevalence of diabetic retinopathy in the population:

| Class | Description                    | Image Count | Percentage (%) |
|-------|--------------------------------|-------------|----------------|
| 0     | No DR                          | 1805        | 50.19%         |
| 1     | Mild DR                        | 370         | 10.28%         |
| 2     | Moderate DR                    | 999         | 27.77%         |
| 3     | Severe DR                      | 193         | 5.36%          |
| 4     | Proliferative DR                | 295         | 8.20%          |

_Total images: 3662_

> This imbalance highlights the importance of **careful sampling strategies** and **data augmentation techniques** during model training.

---

## 🖼️ Sample Images from the Dataset

| No DR (Class 0)                          | Mild DR (Class 1)                          |
|-------------------------------------------|--------------------------------------------|
| ![No DR](images/no_dr.png)                | ![Mild DR](images/mild_dr.png)             |

> _Sample retinal fundus images. Left: Healthy retina (No DR). Right: Mild DR with subtle microaneurysms._

---

## 📚 Acknowledgment

I would like to acknowledge the **Asia Pacific Tele-Ophthalmology Society (APTOS)** for providing this valuable dataset. This dataset has been instrumental in enabling research and experimentation toward the early detection of diabetic retinopathy using machine learning models.

For more details, visit the [APTOS 2019 Blindness Detection Competition](https://www.kaggle.com/competitions/aptos2019-blindness-detection).



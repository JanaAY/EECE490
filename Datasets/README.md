# 🩺 Diabetic Retinopathy Datasets: Combined Preprocessing & Analysis

In this repository, we present a **comprehensive preprocessing and analysis pipeline** applied to multiple publicly available **diabetic retinopathy (DR) datasets**. Our objective was to **maximize dataset size and diversity** while ensuring **high image quality** and **label consistency** across datasets.

We conducted:

- **Exploratory Data Analysis (EDA)** to study the structural and statistical properties of each dataset.
- **Cleaning and Filtering** to remove low-quality images through:
  - **Blur detection**.
  - **Brightness checks**.
  - **Annotation removal**.
  - **Glare filtering**.
  - **Border removal**.
- **Denoising and contrast enhancement** using **CLAHE** to standardize image quality.
- **Combining datasets** that exhibited **similar characteristics** during EDA to create a **larger, unified dataset** for DR detection.

---

# 📂 Available Datasets & Resources

As part of this project, we curated and processed multiple **diabetic retinopathy (DR) datasets** from various sources. Each dataset underwent **extensive cleaning, quality filtering, and preprocessing**, making them ready for use in DR research and machine learning applications.

The following datasets are **publicly available** for research purposes:

---

## 🩺 Diabetic Retinopathy Datasets (Fundus Images)

- **Cleaned & Processed DR Images (512x512 resolution):**  
  A large collection of DR fundus images covering different severity levels.  
  [🔗 Access here](https://drive.google.com/drive/folders/1vVc7J21AUy6LT2HOqOWP3hbVn4zZELKj?usp=sharing)

- **Cleaned & Processed Non-DR Images (512x512 resolution):**  
  A corresponding set of healthy fundus images.  
  [🔗 Access here](https://drive.google.com/drive/folders/1EhrUOon6ypKdA7UedmLALTiLh-KTDFdl?usp=sharing)

- **Balanced Multi-Class Dataset (200x200 resolution, Train/Val/Test Split):**  
  A fully balanced dataset covering all **five DR stages** (No DR to Proliferative DR), split into **training, validation, and testing** sets.  
  [🔗 Access here](https://drive.google.com/drive/folders/1wsbS_nJ38qgHcN2J-U-HBjNAxUrIdWKy?usp=drive_link)

- **Balanced Binary-Class Dataset (200x200 resolution, Train/Val/Test Split):**  
  A **binary-class** version (DR vs No DR), also balanced and augmented for robustness, with the same split structure.  
  [🔗 Access here](https://drive.google.com/drive/folders/1wsbS_nJ38qgHcN2J-U-HBjNAxUrIdWKy?usp=drive_link)

---

## 🩻 Retinal Vessel Segmentation Datasets

- **Training Set (256x256 resolution):**  
  Includes both **fundus images** and their corresponding **vessel masks**, prepared for segmentation tasks.  
  - [🔗 Original Images](https://drive.google.com/drive/folders/13aAv9XsnnRYcn2oQPO1xHU19f9nfCvUv?usp=sharing)  
  - [🔗 Vessel Masks](https://drive.google.com/drive/folders/1F4M65q_Uv5ltTSffSgaGofL9cZG_nuA5?usp=drive_link)

- **Testing Set (256x256 resolution):**  
  - [🔗 Original Images](https://drive.google.com/drive/folders/1vI-VuH-ZPrUuI6bfbVBVOb3IZ2nmSaQv?usp=drive_link)  
  - [🔗 Vessel Masks](https://drive.google.com/drive/folders/1C9SwyrAEyqaPtypGHuUS0GMKHjQrpXag?usp=drive_link)

---

## 📝 Dataset Sources (Acknowledgments)

The datasets processed in this project include:

- **APTOS**, **EyePACS**, **HRF**, **IDRiD**, **DDR**, **Messidor-2** (for diabetic retinopathy classification)
- **DRIVE**, **CHASE_DB1**, **IOSTAR**, **FIVES**, **ARIA** (for retinal vessel segmentation)

We gratefully acknowledge the creators of these datasets for their invaluable contributions to the research community.

---

## 🔗 Explore More Contributions

Explore additional **resources, models, and contributions** related to diabetic retinopathy research:  
[📂 Contributions Folder](https://drive.google.com/drive/folders/1C56uCRYzMQqAeCLA0AXTnykobnliiRdG?usp=sharing)

These datasets and resources are **open-access**, supporting the broader research community in advancing solutions for diabetic retinopathy detection and analysis.




The **results of this extensive preprocessing and data analysis workflow** for each dataset are outlined below in their respective folders.

> _This effort enhances data availability for training robust machine learning models in diabetic retinopathy research._




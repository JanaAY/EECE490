# 📊 Dataset Overview: IDRiD - Indian Diabetic Retinopathy Image Dataset

## 🔍 About the Dataset

For this project, I utilized the **Indian Diabetic Retinopathy Image Dataset (IDRiD)**, available on [IEEE DataPort](https://ieee-dataport.org/open-access/indian-diabetic-retinopathy-image-dataset-idrid). This dataset provides a **comprehensive collection of retinal fundus images** captured in an Indian population, aimed at supporting automated diabetic retinopathy (DR) detection and grading.

The dataset includes:
- **Disease Grading Annotations** for DR severity.
- **Original high-resolution fundus images** from both training and testing sets.

---

## 📁 Dataset Source

- **Dataset Page:** [IEEE DataPort - IDRiD](https://ieee-dataport.org/open-access/indian-diabetic-retinopathy-image-dataset-idrid)
- **Provided by:** IEEE & Indian Institute of Technology (IIT)  
- **Purpose:** DR grading, lesion segmentation, and localization tasks.

_All credit for data collection and preparation goes to the dataset creators. This dataset is used strictly for research and educational purposes._

---

## 🛠️ Preprocessing Pipeline Overview

1. **Metadata Preparation:**
   - Merged **training** and **testing labels** into a single **Excel file**.
   - Unified filenames (e.g., `IDRid_001.jpeg`, `IDRid_002.jpeg`).

2. **Image Format Conversion:**
   - Converted all **.jpg** images to **.jpeg** for consistency.

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
   - Filtered the label files to ensure alignment with preprocessed images.
   - Counted images per DR severity class.

5. **Dataset Organization:**
   - Saved cleaned images in:
     - `/IDRD/Cleaned_IDRiD/`
   - Generated final **Excel annotation file**:
     - `cleaned_labels.xlsx`

---

## 📚 Acknowledgment

I would like to acknowledge the **IEEE DataPort** and **Indian Institute of Technology (IIT)** for providing the **IDRiD dataset**. Their contribution enables research and experimentation in advancing automated diabetic retinopathy detection and medical image analysis.


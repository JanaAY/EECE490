# 🩺 Diabetic Retinopathy Research Assistant Chatbot

This repository contains the code for a **Diabetic Retinopathy (DR) Research Assistant Chatbot**, designed to assist researchers, clinicians, and practitioners by answering **domain-specific questions** related to **diabetic retinopathy**. The chatbot leverages a curated dataset of medical articles, research papers, and expert knowledge to provide **accurate and context-aware responses**.

---

## ✨ Features

- **🎯 Domain-Specific Expertise:**  
  Focused exclusively on **diabetic retinopathy (DR)** topics, ensuring precise and relevant answers.

- **🧠 Context-Aware Responses:**  
  Combines **document retrieval** with a **GPT model** to generate responses grounded in medical literature.

- **🔄 Multi-Turn Conversations:**  
  Supports **follow-up questions** within the same session, enabling dynamic, coherent discussions.

- **🚀 Lightweight API Deployment:**  
  Easily deployable via **Flask**, with optional **ngrok** integration for public access.

- **🔒 Secure Embedding Retrieval:**  
  Embeddings and source texts are **securely handled**, ensuring data privacy and integrity.

---

## 🏗️ Architecture

| Component           | Technology                           |
|---------------------|---------------------------------------|
| **Backend**         | Python, Flask                         |
| **Language Model**  | Azure OpenAI GPT (`gpt-4o-mini`)      |
| **Embedding Model** | OpenAI `text-embedding-ada-002`       |
| **Data Sources**    | Preprocessed diabetic retinopathy research articles |

---

## ⚙️ How It Works

1. **User Query Embedding:**  
   The chatbot takes the user’s query and embeds it into a **vector space** using the **text-embedding-ada-002** model.

2. **Document Retrieval:**  
   It retrieves the most relevant **document chunks** from the preprocessed dataset using **cosine similarity**.

3. **Response Generation:**  
   The **GPT model** (gpt-4o-mini) generates a response by combining the **retrieved context** with its trained knowledge, ensuring that answers are **restricted to DR-related topics**.

---

## 🔗 Deployment Guide

1. Clone this repository.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt

## Disclaimer
This chatbot is intended for informational and educational purposes only. It does not provide professional advice, medical diagnosis, or treatment recommendations. Users should verify any critical information independently and consult qualified professionals when necessary.

# 🌟 Diabetic Retinopathy Web Platform

This project is a complete system for:
- **Image Generation**: Create synthetic retinal images for Diabetic Retinopathy (DR) and No-DR using StyleGAN3.
- **DR Detection**: Upload a fundus image and predict the presence of Diabetic Retinopathy.
- **Vessel Mapping**: Generate vessel segmentation maps from retinal images.
- **DR Chatbot**: Ask questions about Diabetic Retinopathy using an AI-powered chatbot.

The website consists of:
- **Frontend**: Built with Next.js 14 and ShadCN UI.
- **Backend**: Built with Flask, TensorFlow, PyTorch.
- **Deployment**: Using Docker and Docker Compose for easy installation.

## 🚀 How to Run the Website (with Docker)

1. **Install Docker and Docker Compose**

   - Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
   - Confirm installation:
   
   ```bash
   docker --version
   docker compose version

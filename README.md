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

✅ You should see the versions.

2. **Clone the Project**
   
   ```bash
   git clone https://github.com/JanaAY/EECE490.git
   cd EECE490

3. **Build the Containers**
   
   ```bash
   docker-compose build --no-cache
   
This will:

Build the backend container (Flask app with AI models)

Build the frontend container (Next.js website)

⏳ First build may take ~5-10 minutes because it installs all libraries.

4. **Run the Website**
   
   ```bash
   docker-compose up

Backend Flask server will run on http://localhost:5000

Frontend website will run on http://localhost:3000

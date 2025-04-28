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
   git clone --branch website --single-branch https://github.com/JanaAY/EECE490.git
   cd EECE490

3. **Build and Run the Website**

   ```bash
   docker-compose up --build
   
This will:
- Build the backend container (Flask app with AI models)
- Build the frontend container (Next.js website)
- Start both containers immediately after building

⏳ Note: The first build may take 5–10 minutes depending on your internet speed.

4. **Access the Website**

   - Frontend: http://localhost:3000 (Main website)
   - Backend API: http://localhost:5000 (Flask server)
  
⚠️ **Important Note:**

If the models inside backend/generation/ are missing after running the project, please manually download them from the Google Drive link and place them inside the backend/generation/ folder. https://drive.google.com/drive/folders/1WpuP8xXWLH86M2yGg41EZ7fzRk1xpKY8?usp=sharing


## ⚡ Alternative Manual Setup (if Docker does not work)

If you face any issues with Docker, you can run frontend and backend manually in two separate terminals:

   1. 🖥️ Terminal 1: Backend (Flask)
      ```bash
      cd backend
      pip install -r requirements.txt
      python app.py

✅ This will start the backend server on http://localhost:5000

   2. 🖥️ Terminal 2: Frontend (Next.js)
      ```bash
      cd frontend
      npm install
      npm run dev

✅ This will start the frontend development server on http://localhost:3000

⚙️ Notes
- Make sure you have Python 3.10+ installed.
- Make sure you have Node.js 18+ installed for the frontend.
- If running manually, start backend first, then the frontend.
- In manual mode, the backend and frontend will still communicate normally through localhost ports.

## 🎥 Demo Video

[![Watch the Demo](https://img.youtube.com/vi/Sbvax9-YqgU/maxresdefault.jpg)](https://www.youtube.com/watch?v=Sbvax9-YqgU)

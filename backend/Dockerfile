# Inside backend/Dockerfile

FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    git \ 
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements first
COPY requirements.txt .
RUN pip install --default-timeout=300 --no-cache-dir -r requirements.txt


# Copy backend code
COPY . .

# Clone StyleGAN3 code
RUN git clone https://github.com/NVlabs/stylegan3.git stylegan3

# Run the app
CMD ["python", "app.py"]

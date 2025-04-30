FROM python:3.10-slim
ENV CUDA_VISIBLE_DEVICES="" \
    PIP_DEFAULT_TIMEOUT=1000

WORKDIR /app

# only system libs needed for cv2
RUN apt-get update && apt-get install -y \
      libgl1-mesa-glx \
      libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# copy in your requirements
COPY requirements.txt .

# install PyTorch CPU wheels first, then the rest of your deps
RUN pip install --no-cache-dir \
      -f https://download.pytorch.org/whl/cpu/torch_stable.html \
      torch==2.7.0 torchvision==0.16.1 && \
    pip install --no-cache-dir -r requirements.txt

# copy your app code & pre-downloaded assets
COPY app.py .
COPY generation/ ./generation/
COPY detection/ ./detection/
COPY vessel_map/ ./vessel_map/
COPY chatbot/ ./chatbot/
COPY stylegan3/ ./stylegan3/

EXPOSE 5000
CMD ["python", "app.py"]

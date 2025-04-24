FROM python:3.11-slim
WORKDIR /app

# ─── Install CA certificates so SSL works ────────────────────────────────
RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates \
 && update-ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# ─── Configure pip retries & timeouts ────────────────────────────────────
ENV PIP_DEFAULT_TIMEOUT=1000 \
    PIP_MAX_RETRIES=10 \
    PIP_RETRY_BACKOFF_FACTOR=3

# ─── Install Python deps, trusting PyPI hosts ────────────────────────────
COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache-dir \
      --trusted-host pypi.org \
      --trusted-host files.pythonhosted.org \
      -r requirements.txt

# ─── Copy app & expose port ─────────────────────────────────────────────
COPY . .
EXPOSE 5000

# ─── Run Flask ──────────────────────────────────────────────────────────
CMD ["python", "app.py"]

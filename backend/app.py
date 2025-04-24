# app.py  (inside eece490-backend/)
import os, re, pickle, faiss, numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import AzureOpenAI

load_dotenv()                       # .env holds your Azure keys
EMBED = os.getenv("EMBED_DEPLOYMENT", "text-embedding-ada-002")
CHAT  = os.getenv("CHAT_DEPLOYMENT",  "gpt-4o-mini")

client = AzureOpenAI(
    api_key        = os.getenv("AZURE_OPENAI_KEY"),
    azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_version    = "2025-01-01-preview",
)

# --- load model files -------------------------------------------------
MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")
index = faiss.read_index(os.path.join(MODEL_DIR, "dr_index.faiss"))
texts = pickle.load(open(os.path.join(MODEL_DIR, "dr_texts.pkl"), "rb"))

# --- helpers ----------------------------------------------------------
clean = lambda s: re.sub(r"[^a-z0-9\s]", "", s.lower()).strip()
def embed(q):
    e = client.embeddings.create(model=EMBED, input=[q])
    return np.asarray(e.data[0].embedding, dtype="float32").reshape(1, -1)

def answer(query, k=3):
    vec          = embed(clean(query))
    _d, idx      = index.search(vec, k)
    context      = "\n\n".join(texts[i] for i in idx[0])
    resp = client.chat.completions.create(
        model=CHAT,
        messages=[
            {"role":"system","content":
                "You are a friendly DR assistant. Use context when helpful:\n\n"+context},
            {"role":"user","content":query}],
        max_tokens=800, temperature=.5
    )
    return {"answer": resp.choices[0].message.content}

# --- flask app --------------------------------------------------------
app = Flask(__name__)
CORS(app)                                    # allow any origin (change later)

@app.post("/chat")
def chat():                                  # POST JSON: { "query": "..." }
    q = request.json.get("query", "")
    return jsonify(answer(q)) if q else (jsonify({"error":"no query"}), 400)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

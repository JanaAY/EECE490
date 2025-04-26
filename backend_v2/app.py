import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import numpy as np
import pickle
import openai
from sklearn.metrics.pairwise import cosine_similarity

# Load environment variables
load_dotenv()

# Debug prints
print("API Key:", os.getenv("AZURE_OPENAI_KEY"))
print("Endpoint:", os.getenv("AZURE_OPENAI_ENDPOINT"))

# Initialize Azure OpenAI client
openai.api_type = "azure"
openai.api_base = "https://twt00-m9jvr359-eastus2.openai.azure.com/"
openai.api_key = "CIOd5mdimXIfdjcMJ8ZqfmUAwSJPGQuxzogAgD8HsKYu4NBcRQoCJQQJ99BDACHYHv6XJ3w3AAAAACOG9VXo"
openai.api_version = "2025-01-01-preview"

# Load embeddings and texts
embedding_matrix = np.load("dr_embeddings.npy")
with open("dr_texts.pkl", "rb") as f:
    texts = pickle.load(f)

def embed_query(text):
    """Get embedding for query text"""
    response = openai.Embedding.create(
        input=[text],
        engine="text-embedding-ada-002"
    )
    return np.array(response['data'][0]['embedding']).reshape(1, -1).astype("float32")

def ask_gpt_with_context(query, top_k=3):
    """Main function to get GPT response with relevant context"""
    # 1. Embed the query
    query_vec = embed_query(query)

    # 2. Find most similar chunks
    similarities = cosine_similarity(query_vec, embedding_matrix)
    top_k_indices = similarities[0].argsort()[::-1][:top_k]
    retrieved_chunks = [texts[i] for i in top_k_indices]

    # 3. Build system prompt with relevant context
    context = "\n\n".join(retrieved_chunks)
    messages = [
        {
            "role": "system",
            "content": (
                "You are a friendly and helpful assistant specialized in diabetic retinopathy (DR). "
                "Always greet users warmly and answer in a clear, supportive tone. "
                "Only answer questions related to diabetic retinopathy. "
                "If a question is unrelated, respond politely with: "
                "'I'm sorry, I only provide support for diabetic retinopathy-related topics.'\n\n"
                "Use the following research document context if helpful:\n\n" + context
            )
        },
        {"role": "user", "content": query}
    ]

    # 4. Call GPT
    response = openai.ChatCompletion.create(
        engine="gpt-4o-mini",
        messages=messages,
        max_tokens=800,
        temperature=0.5
    )

    return response.choices[0].message['content']

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.post("/chat")
def chat():
    """Endpoint to handle chat requests"""
    query = request.json.get("query", "")
    if not query:
        return jsonify({"error": "no query"}), 400
        
    try:
        response = ask_gpt_with_context(query)
        return jsonify({
            "answer": response,
            "confidence": 1.0,  # Since we're using GPT, we'll assume high confidence
            "is_confident": True
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
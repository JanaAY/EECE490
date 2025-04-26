import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import numpy as np
import pickle
from openai import AzureOpenAI
from sklearn.metrics.pairwise import cosine_similarity
import base64
import io
from generator import load_generator, generate_images
import cv2
import torch
import base64                                       


# # — DR detection imports —
# from model_detection      import load_model, predict
# from preprocess_detection import preprocess_image

# import sys
# from tensorflow import keras
# from tensorflow.keras.models import functional as functional_module

# — vessel mapping import —
from model import DARes2UNet
from preprocessing import preprocess_image



# # Make “keras.src.models.functional” resolve to TF-Keras’s functional module:
# sys.modules['keras']                       = keras
# sys.modules['keras.src']                   = keras
# sys.modules['keras.src.models']            = keras.models
# sys.modules['keras.src.models.functional'] = functional_module

# from tensorflow.keras.models import load_model as keras_load_model
# print("Loading DR model…")
# dr_model = keras_load_model("best_model.keras")
# print("✅ DR model ready!")

    
# Debug prints
print("API Key:", os.getenv("AZURE_OPENAI_KEY"))
print("Endpoint:", os.getenv("AZURE_OPENAI_ENDPOINT"))
print("Deployment:", os.getenv("AZURE_OPENAI_DEPLOYMENT"))

# Initialize Azure OpenAI client
client = AzureOpenAI(
    azure_endpoint="https://twt00-m9jvr359-eastus2.openai.azure.com/",
    api_key="CIOd5mdimXIfdjcMJ8ZqfmUAwSJPGQuxzogAgD8HsKYu4NBcRQoCJQQJ99BDACHYHv6XJ3w3AAAAACOG9VXo",
    api_version="2025-01-01-preview"
)

# Load embeddings and texts
embedding_matrix = np.load("dr_embeddings.npy")
with open("dr_texts.pkl", "rb") as f:
    texts = pickle.load(f)

# Load generators at startup
try:
    print("Loading image generators...")
    G_no_dr = load_generator('./generation/no_dr_model.pkl')
    G_dr = load_generator('./generation/dr_model.pkl')
    print("Image generators loaded successfully!")
except Exception as e:
    print(f"Error loading generators: {e}")
    G_no_dr = None
    G_dr = None

# Initialize model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
vessel_model = DARes2UNet().to(device)
try:
    vessel_model.load_state_dict(torch.load('best_model.pth', map_location=device))
    vessel_model.eval()
    print("Vessel mapping model loaded successfully!")
except Exception as e:
    print(f"Error loading vessel mapping model: {e}")
    vessel_model = None

def embed_query(text):
    """Get embedding for query text"""
    response = client.embeddings.create(
        model="text-embedding-ada-002",
        input=[text]
    )
    return np.array(response.data[0].embedding).reshape(1, -1).astype("float32")

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
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        max_tokens=800,
        temperature=0.5
    )

    return response.choices[0].message.content

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

@app.post("/generate")
def generate():
    """Endpoint to generate DR and non-DR images"""
    if G_dr is None or G_no_dr is None:
        return jsonify({"error": "Image generators not initialized"}), 500
        
    try:
        dr_count = int(request.json.get("dr_count", 0))
        #non_dr_count = int(request.json.get("non_dr_count", 0))
        non_dr_count = 0


        if dr_count < 0 or non_dr_count < 0 or dr_count + non_dr_count > 100:
            return jsonify({"error": "Invalid image counts"}), 400
        
        # Generate images
        dr_images = generate_images(G_dr, num_images=dr_count) if dr_count > 0 else []
        non_dr_images = generate_images(G_no_dr, num_images=non_dr_count) if non_dr_count > 0 else []
        
        # Convert to base64
        def img_to_base64(img):
            buffered = io.BytesIO()
            img.save(buffered, format="PNG")
            return base64.b64encode(buffered.getvalue()).decode()
            
        response = {
            "dr_images": [img_to_base64(img) for img in dr_images],
            "non_dr_images": [img_to_base64(img) for img in non_dr_images]
        }
        
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.post("/vessel-map")
def generate_vessel_map():
    """Endpoint to generate vessel map from retinal image"""
    if vessel_model is None:
        return jsonify({"error": "Vessel mapping model not initialized"}), 500
        
    try:
        # Get the image from request
        if 'image' not in request.files:
            return jsonify({"error": "No image provided"}), 400
            
        file = request.files['image']
        # Read image
        img_stream = io.BytesIO(file.read())
        img_array = np.frombuffer(img_stream.getvalue(), dtype=np.uint8)
        image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        
        if image is None:
            return jsonify({"error": "Invalid image format"}), 400
            
        # Preprocess image
        processed_img = preprocess_image(image)
        
        # Convert to tensor and add batch dimension
        img_tensor = torch.from_numpy(processed_img).permute(2, 0, 1).unsqueeze(0).to(device)
        
        # Generate vessel map
        with torch.no_grad():
            vessel_map = vessel_model(img_tensor)
            
        # Convert to image
        vessel_map = (vessel_map[0, 0].cpu().numpy() * 255).astype(np.uint8)
        
        # Convert to base64
        _, buffer = cv2.imencode('.png', vessel_map)
        vessel_map_base64 = base64.b64encode(buffer).decode()
        
        return jsonify({
            "vessel_map": vessel_map_base64
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @app.route("/detect", methods=["POST"])
# @cross_origin()   # ensure CORS header even on failures
# def detect():
#     if dr_model is None:
#         return jsonify(error="DR model not initialized"), 500

#     if "image" not in request.files:
#         return jsonify(error="No file part"), 400

#     # 1) Decode upload
#     file = request.files["image"]
#     arr  = np.frombuffer(file.read(), dtype=np.uint8)
#     img  = cv2.imdecode(arr, cv2.IMREAD_COLOR)
#     if img is None:
#         return jsonify(error="Cannot decode image"), 400

#     # 2) Preprocess & quality checks
#     proc = preprocess_image(img)
#     if proc is None:
#         return jsonify(error="Image failed quality checks"), 400

#     # 3) Inference
#     prob = float(predict(dr_model, proc))  # sigmoid output in [0,1]

#     # 4) Build response fields
#     prediction = "DR Detected" if prob >= 0.5 else "No DR Detected"
#     confidence = prob if prob >= 0.5 else 1 - prob

#     severity = None
#     if prob >= 0.5:
#         if prob < 0.6: severity = "Mild NPDR"
#         elif prob < 0.8: severity = "Moderate NPDR"
#         else: severity = "Severe NPDR"

#     features = [
#         "Microaneurysms",
#         "Dot & blot hemorrhages",
#         "Hard exudates",
#         "Cotton wool spots"
#     ] if prob >= 0.5 else []

#     return jsonify({
#         "prediction": prediction,
#         "confidence": round(confidence, 3),
#         "severity": severity,
#         "features": features
#     })
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
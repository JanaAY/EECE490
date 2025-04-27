import cv2
import numpy as np

# === Black Border Remover ===
def remove_black_border(img, threshold=5):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, threshold, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        return img
    x, y, w, h = cv2.boundingRect(max(contours, key=cv2.contourArea))
    return img[y:y+h, x:x+w]

# === Auto Flip if Left Eye ===
def auto_flip_if_left_eye(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    h, w = gray.shape
    left = np.mean(gray[:, :w//2])
    right = np.mean(gray[:, w//2:])
    if right > left:
        return cv2.flip(img, 1)
    return img

# === Full Preprocessing ===
def preprocess_detection(img, target_size=(200, 200)):  # 🔥 Changed to 200x200
    if img is None or len(img.shape) != 3 or img.shape[2] != 3:
        return None

    # Blur and brightness checks
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    if cv2.Laplacian(gray, cv2.CV_64F).var() < 20.0:
        return None
    if np.mean(gray) < 25:
        return None

    img = remove_black_border(img)
    img = auto_flip_if_left_eye(img)

    # CLAHE enhancement
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    l = clahe.apply(l)
    img = cv2.cvtColor(cv2.merge((l, a, b)), cv2.COLOR_LAB2BGR)

    # Glare detection
    glare_mask = cv2.inRange(img, (240, 240, 240), (255, 255, 255))
    contours, _ = cv2.findContours(glare_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if any(cv2.contourArea(c) > 500 for c in contours):
        return None

    # Text/annotation filter
    mask_text = cv2.inRange(img, (220, 220, 220), (255, 255, 255))
    if cv2.countNonZero(mask_text) > 3000:
        return None

    # Dark region filter
    if np.mean(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) > 10) < 0.2:
        return None

    # Resize to 200x200 🔥
    img = cv2.resize(img, target_size, interpolation=cv2.INTER_AREA)

    # Normalize to [-1, 1] 🔥
    img = img.astype(np.float32) / 127.5 - 1.0

    return img

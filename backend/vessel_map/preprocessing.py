import cv2
import numpy as np

# === CONFIG ===
target_size = (256, 256)  # Match your training size!

# === Preprocessing Functions ===

def remove_black_border(image):
    """
    Removes black borders around the fundus image by finding the largest contour.
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 10, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if not contours:
        return image  # If no contours found, return original image
    
    x, y, w, h = cv2.boundingRect(max(contours, key=cv2.contourArea))
    side = max(w, h)
    cx, cy = x + w // 2, y + h // 2
    x_new = max(cx - side // 2, 0)
    y_new = max(cy - side // 2, 0)
    return image[y_new:y_new+side, x_new:x_new+side]


def preprocess_image(img):
    """
    Applies your full preprocessing pipeline:
    1. Removes black borders.
    2. Extracts green channel.
    3. Applies gamma correction.
    4. Applies CLAHE enhancement.
    5. Sharpens the image.
    6. Converts back to 3-channel.
    7. Resizes to (256, 256).
    8. Z-score normalizes.
    """
    # Remove black border
    img = remove_black_border(img)

    # Extract green channel
    green = img[:, :, 1]

    # Gamma correction (gamma=0.6)
    gamma = 0.6
    table = np.array([((i / 255.0) ** gamma) * 255 for i in np.arange(256)]).astype("uint8")
    green = cv2.LUT(green, table)

    # CLAHE (contrast enhancement)
    clahe = cv2.createCLAHE(clipLimit=4.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(green)

    # Sharpening filter (enhance vessel edges)
    kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
    enhanced = cv2.filter2D(enhanced, -1, kernel)

    # Convert back to 3-channel
    img = cv2.merge([enhanced, enhanced, enhanced])

    # Resize to target size (256x256)
    img = cv2.resize(img, target_size, interpolation=cv2.INTER_AREA)

    # Z-score normalization (optional but matching your training)
    img = img.astype(np.float32)
    mean, std = img.mean(), img.std()
    img = (img - mean) / (std + 1e-8)

    return img

import numpy as np

from tensorflow.keras.models import load_model
from tensorflow.keras import layers, models, regularizers, Input

def build_advanced_rsg_net(input_shape=(200, 200, 3), num_classes=2):
    inputs = Input(shape=input_shape)

    # === RSG Block 1 ===
    x = layers.Conv2D(32, (3, 3), padding='same', kernel_regularizer=regularizers.l2(0.001))(inputs)
    x = layers.ReLU()(x)
    x = layers.Conv2D(32, (3, 3), padding='same', kernel_regularizer=regularizers.l2(0.001))(x)
    x = layers.ReLU()(x)
    x = layers.MaxPooling2D((2, 2))(x)

    # === RSG Block 2 ===
    x = layers.Conv2D(64, (3, 3), padding='same', kernel_regularizer=regularizers.l2(0.001))(x)
    x = layers.ReLU()(x)
    x = layers.Conv2D(128, (3, 3), padding='same', kernel_regularizer=regularizers.l2(0.001))(x)
    x = layers.ReLU()(x)
    x = layers.MaxPooling2D((2, 2))(x)

    # === Global Average Pooling + Dense Layers ===
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dense(128, activation='relu', kernel_regularizer=regularizers.l2(0.001))(x)
    x = layers.BatchNormalization()(x)
    x = layers.Dropout(0.5)(x)

    x = layers.Dense(64, activation='relu', kernel_regularizer=regularizers.l2(0.001))(x)
    x = layers.Dropout(0.3)(x)

    # === Output
    outputs = layers.Dense(1, activation='sigmoid')(x)

    model = models.Model(inputs, outputs)
    return model

# === Updated load function ===
def load_full_model(weights_path):
    model = build_advanced_rsg_net(input_shape=(200, 200, 3), num_classes=2)
    model.load_weights(weights_path)
    return model


# === Predict function ===
def predict(model, img):
    """
    Predicts the class (DR or No_DR) for a preprocessed image.

    Args:
        model: Loaded TensorFlow model.
        img (np.ndarray): Preprocessed image (normalized, shape (200, 200, 3)).

    Returns:
        float: Probability score for DR.
    """
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    prob = float(model.predict(img, verbose=0)[0][0])
    return prob

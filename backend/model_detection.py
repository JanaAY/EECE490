import tensorflow as tf
from tensorflow.keras import layers, models, regularizers

# === Build the Advanced RSG-Net model ===
def build_advanced_rsg_net(input_shape=(200, 200, 3), num_classes=2):
    inputs = tf.keras.Input(shape=input_shape)

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

    # === Output Layer ===
    if num_classes == 2:
        outputs = layers.Dense(1, activation='sigmoid')(x)
    else:
        outputs = layers.Dense(num_classes, activation='softmax')(x)

    model = models.Model(inputs, outputs)
    return model

# === Load the model with trained weights ===
def load_model(weights_path, input_shape=(200, 200, 3), num_classes=2):
    model = build_advanced_rsg_net(input_shape=input_shape, num_classes=num_classes)
    model.load_weights(weights_path)
    return model


# === Predict function ===
import numpy as np

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
    prob = model.predict(img)[0][0]  # Sigmoid output
    return prob

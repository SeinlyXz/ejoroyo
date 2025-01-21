import * as tf from '@tensorflow/tfjs-node';

// Helper function to preprocess image
export function preprocessImage(imageBuffer: Buffer): tf.Tensor {
    const decodedImage = tf.node.decodeImage(imageBuffer, 3); // Decode to 3 channels (RGB)
    const resizedImage = tf.image.resizeBilinear(decodedImage, [150, 150]); // Match model input shape
    const normalizedImage = resizedImage.div(255.0).expandDims(0); // Normalize and add batch dimension

    return normalizedImage;
}

// Helper function to process predictions
export function processPredictions(predictions: tf.Tensor) {
    const predictionArray = predictions.dataSync();
    const classLabels = [
        "Bacterial_spot",
        "Early_blight",
        "Late_blight",
        "Leaf_Mold",
        "Septoria_leaf_spot",
        "Spider_mites Two-spotted_spider_mite",
        "Target_Spot",
        "Tomato_Yellow_Leaf_Curl_Virus",
        "Tomato_mosaic_virus",
        "Healthy",
    ];
    return Array.from(predictionArray).map((confidence, index) => ({
        class: classLabels[index],
        confidence,
    })).sort((a, b) => b.confidence - a.confidence);
}

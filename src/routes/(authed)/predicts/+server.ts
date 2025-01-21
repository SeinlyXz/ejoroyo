import { preprocessImage, processPredictions } from '$lib/helpers/predict-preprocess';
import { json } from '@sveltejs/kit';
import * as tf from '@tensorflow/tfjs-node';
import path from 'path';

export const POST = async(event) => {
    try {
        // Load the TensorFlow.js model
        const modelPath = path.resolve('static/tomato_model/model.json');
        const model = await tf.loadLayersModel(`file://${modelPath}`);

        // Get the uploaded file
        const formData = await event.request.formData();
        const imageFile = formData.get('gambar');

        if (imageFile instanceof File) {
            // Convert the uploaded file to a tensor
            const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
            const imagetensor = preprocessImage(imageBuffer);

            // Make predictions
            const predictions = model.predict(imagetensor) as tf.Tensor;

            // Process predictions
            const processedPredictions = processPredictions(predictions);

            let mostConfidentPrediction = processedPredictions[0];

            return json({ predictions: mostConfidentPrediction });
        }

        return json({ error: 'No valid image uploaded' }); 
    } catch (error) {
        console.error('Prediction error:', error);
        return json({ error: 'Prediction failed' });
    }
}
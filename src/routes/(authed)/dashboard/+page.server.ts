import { preprocessImage, processPredictions } from '$lib/helpers/predict-preprocess';
import * as tf from '@tensorflow/tfjs-node';
import path from 'path';

export const load = async ({ locals }) => {
    return {
        plants: locals.pb.collection('Plants').getFullList({})
    }
};

export const actions = {
	default: async (event) => {
		const datas = [
			{ healthiness: 48, probability_of_sickness: 0.350961, symptoms: 'healthy' },
			{ healthiness: 99, probability_of_sickness: 0.823658, symptoms: 'Septoria_leaf_spot' },
			{
				healthiness: 33,
				probability_of_sickness: 0.577458,
				symptoms: 'Spider_mites Two-spotted_spider_mite'
			},
			{ healthiness: 24, probability_of_sickness: 0.510437, symptoms: 'Tomato_mosaic_virus' },
			{
				healthiness: 100,
				probability_of_sickness: 0.704253,
				symptoms: 'Spider_mites Two-spotted_spider_mite'
			},
			{ healthiness: 45, probability_of_sickness: 0.783579, symptoms: 'Late_blight' },
			{ healthiness: 65, probability_of_sickness: 0.757397, symptoms: 'Tomato_mosaic_virus' },
			{
				healthiness: 79,
				probability_of_sickness: 0.197269,
				symptoms: 'Spider_mites Two-spotted_spider_mite'
			},
			{
				healthiness: 36,
				probability_of_sickness: 0.689753,
				symptoms: 'Tomato_Yellow_Leaf_Curl_Virus'
			},
			{ healthiness: 16, probability_of_sickness: 0.599431, symptoms: 'Late_blight' },
			{
				healthiness: 62,
				probability_of_sickness: 0.229209,
				symptoms: 'Spider_mites Two-spotted_spider_mite'
			},
			{ healthiness: 47, probability_of_sickness: 0.245243, symptoms: 'Bacterial_spot' },
			{ healthiness: 64, probability_of_sickness: 0.257497, symptoms: 'Target_Spot' },
			{ healthiness: 91, probability_of_sickness: 0.850404, symptoms: 'healthy' },
			{ healthiness: 33, probability_of_sickness: 0.874337, symptoms: 'healthy' },
			{ healthiness: 100, probability_of_sickness: 0.116785, symptoms: 'Tomato_mosaic_virus' },
			{ healthiness: 97, probability_of_sickness: 0.151812, symptoms: 'Septoria_leaf_spot' },
			{ healthiness: 22, probability_of_sickness: 0.75678, symptoms: 'Early_blight' },
			{ healthiness: 53, probability_of_sickness: 0.585266, symptoms: 'Late_blight' },
			{
				healthiness: 27,
				probability_of_sickness: 0.472612,
				symptoms: 'Spider_mites Two-spotted_spider_mite'
			},
			{
				healthiness: 30,
				probability_of_sickness: 0.28919,
				symptoms: 'Tomato_Yellow_Leaf_Curl_Virus'
			},
			{ healthiness: 73, probability_of_sickness: 0.305215, symptoms: 'Early_blight' },
			{ healthiness: 76, probability_of_sickness: 0.846652, symptoms: 'Early_blight' },
			{
				healthiness: 45,
				probability_of_sickness: 0.887067,
				symptoms: 'Spider_mites Two-spotted_spider_mite'
			},
			{
				healthiness: 74,
				probability_of_sickness: 0.872869,
				symptoms: 'Tomato_Yellow_Leaf_Curl_Virus'
			},
			{ healthiness: 29, probability_of_sickness: 0.399032, symptoms: 'Leaf_Mold' },
			{ healthiness: 36, probability_of_sickness: 0.471677, symptoms: 'Leaf_Mold' },
			{
				healthiness: 3,
				probability_of_sickness: 0.13887,
				symptoms: 'Tomato_Yellow_Leaf_Curl_Virus'
			},
			{ healthiness: 54, probability_of_sickness: 0.702112, symptoms: 'Late_blight' },
			{ healthiness: 59, probability_of_sickness: 0.735779, symptoms: 'Late_blight' }
		];
        console.log('Generating data...');
		try {
            for (const data of datas) {
                console.log(`Creating plant data: ${JSON.stringify(data)}`);
                await event.locals.pb.collection('Plants').create(data);
            }
        } catch (error) {
            console.error('Error creating plant data:', error);
        }                
	}
};

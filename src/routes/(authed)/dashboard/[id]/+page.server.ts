export const load = async ({ params, locals }) => {
	return {
		params: params.id,
		plant: locals.user ? locals.pb.collection('Plants').getOne(params.id) : null
	};
};

export const actions = {
	default: async (event) => {
		try {
			// Get the uploaded file
			const formData = await event.request.formData();
			const plantId = formData.get('plantId')?.toString() || '';
			const healthiness = formData.get('healthiness')
			const formattedHealthiness = Number(healthiness).toFixed(2)?.toString()
			const probability_of_sickness = formData.get('probability_of_sickness')?.toString() || '';
			const symptomps = formData.get('symptomps')?.toString() || '';

			await event.locals.pb.collection('Plants').update(plantId, {
				healthiness: formattedHealthiness,
				probability_of_sickness: probability_of_sickness,
				symptoms: symptomps
			});

		} catch (error) {
			console.error('Error updating plant data:', error);
		}
	}
};
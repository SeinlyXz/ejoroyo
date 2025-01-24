<script lang="ts">
    import Seo from "$lib/components/Seo.svelte";
    import { fly, fade } from 'svelte/transition';
    import { onMount } from 'svelte';
	import FilePonds from "$lib/components/FilePonds.svelte";
    
    let { data } = $props();
    let isVisible = $state(false);
    
    onMount(() => {
        isVisible = true;
    });

    // Function to format date
    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Function to get health status color
    function getHealthColor(health: number) {
        if (health >= 80) return 'text-green-500';
        if (health >= 60) return 'text-yellow-500';
        return 'text-red-500';
    }

    function getHealthBorderColor(health: number) {
        if (health >= 80) return 'border-green-500';
        if (health >= 60) return 'border-yellow-500';
        return 'border-red-500';
    }

    function getSicknessBorderColor(probability: number) {
        if (probability < 0.3) return 'border-green-500';
        if (probability < 0.7) return 'border-yellow-500';
        return 'border-red-500';
    }

    // Function to get sickness probability level
    function getSicknessLevel(probability: number) {
        if (probability < 0.3) return 'Low';
        if (probability < 0.7) return 'Medium';
        return 'High';
    }

    function getSicknessColor(probability: number) {
        if (probability < 0.3) return 'text-green-500';
        if (probability < 0.7) return 'text-yellow-500';
        return 'text-red-500';
    }

    function countHealthiness(accuracy: number) {
        let healthiness = 100 - accuracy * 100
        return healthiness
    }

    let response = $state()
</script>

<Seo title="Ejoroyo | {data.params}" />

<section class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 lg:px-4 px-2">
    {#await data.plant}
        <div class="flex justify-center items-center min-h-[50vh]">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        </div>
    {:then plant}
        {#if isVisible && plant}
            <div class="container mx-auto flex lg:flex-row flex-col gap-10 w-full">
                <section class="lg:w-[60%]">
                    <!-- Header -->
                    <div 
                        in:fly="{{ y: 50, duration: 1000 }}"
                        class="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg mb-6">
                        <h1 class="text-3xl font-bold text-green-800 mb-2">
                            Plant Details
                        </h1>
                        <p class="text-green-600">
                            ID: {plant.collectionId}
                        </p>
                    </div>
    
                    <!-- Main Info Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <!-- Health Status -->
                        <div 
                            in:fly="{{ y: 50, duration: 1000, delay: 200 }}"
                            class="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg">
                            <h2 class="text-xl font-semibold text-green-800 mb-4">Health Status</h2>
                            <div class="flex items-center justify-between">
                                <div class="w-20 h-20 rounded-full border-4 {getHealthBorderColor(plant.healthiness)} flex items-center justify-center">
                                    <span class={`text-2xl font-bold ${getHealthColor(plant.healthiness)}`}>
                                        {plant.healthiness}%
                                    </span>
                                </div>
                                <div class="flex-1 ml-6">
                                    <p class="text-gray-600">Overall plant health assessment</p>
                                    <p class={`text-lg font-semibold ${getHealthColor(plant.healthiness)}`}>
                                        {plant.healthiness >= 80 ? 'Healthy' : plant.healthiness >= 60 ? 'Need Attention' : 'Critical'}
                                    </p>
                                </div>
                            </div>
                        </div>
    
                        <!-- Sickness Probability -->
                        <div 
                            in:fly="{{ y: 50, duration: 1000, delay: 400 }}"
                            class="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg">
                            <h2 class="text-xl font-semibold text-green-800 mb-4">Sickness Probability</h2>
                            <div class="flex items-center justify-between">
                                <div class="w-20 h-20 rounded-full border-4 {getSicknessBorderColor(plant.probability_of_sickness)} flex items-center justify-center">
                                    <span class={`text-lg font-bold ${getSicknessColor(plant.probability_of_sickness)}`}>
                                        {(plant.probability_of_sickness * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div class="flex-1 ml-6">
                                    <p class="text-gray-600">Risk Level</p>
                                    <p class={`text-lg font-semibold ${getSicknessColor(plant.probability_of_sickness)}`}>
                                        {getSicknessLevel(plant.probability_of_sickness)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <!-- Symptoms -->
                    <div 
                        in:fly="{{ y: 50, duration: 1000, delay: 600 }}"
                        class="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg mb-6">
                        <h2 class="text-xl font-semibold text-green-800 mb-4">Detected Symptoms</h2>
                        <div class="space-y-2">
                            {#if plant.healthiness < 60 || plant.probability_of_sickness > 0.3}
                                {#each plant.symptoms.split(' ') as symptom}
                                    <div class="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm mr-2">
                                        {symptom.replace(/_/g, ' ')}
                                    </div>
                                {/each}
                            {:else}
                                <div class="text-green-600">No symptoms detected</div> 
                            {/if}
                        </div>
                    </div>
    
                    <!-- Timestamps -->
                    <div 
                        in:fly="{{ y: 50, duration: 1000, delay: 800 }}"
                        class="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg">
                        <h2 class="text-xl font-semibold text-green-800 mb-4">Timeline</h2>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Created:</span>
                                <span class="text-green-800">{formatDate(plant.created)}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">Last Updated:</span>
                                <span class="text-green-800">{formatDate(plant.updated)}</span>
                            </div>
                        </div>
                    </div>
    
                    <!-- Action Buttons -->
                    <div class="mt-8 flex justify-end space-x-4">
                        <a 
                            href="/dashboard"
                            class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                            Back
                        </a>
                        <button 
                            class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Generate Report
                        </button>
                    </div>
                </section>
                <section class="lg:w-[40%] flex flex-col gap-5">
                    <h1 class="text-2xl font-semibold">
                        Scan Manually
                    </h1>
                    <section>
                        <FilePonds bind:response={response}/>
                        <form method="post" enctype="multipart/form-data" class="flex flex-col gap-3">
                            <input type="hidden" name="plantId" value={plant.id} />
                            <div class="border border-dashed border-gray-500 rounded-xl p-10 bg-gray-100/50 mt-10">
                                {#if response}
                                    {@const prediction = JSON.parse(response?.toString())?.predictions}
                                    <input type="hidden" name="healthiness" value={countHealthiness(prediction.confidence)} />
                                    <input type="hidden" name="probability_of_sickness" value={prediction.confidence} />
                                    <input type="hidden" name="symptomps" value={prediction.class} />
                                    <div class="flex flex-col gap-2">
                                        <span class="text-gray-600">Symptoms: {prediction.class}</span> 
                                        <span class="text-gray-600">Accuracy: {prediction.confidence}</span> 
                                    </div>
                                {:else}
                                    <p>
                                        The result will be displayed here
                                    </p>
                                {/if}
                            </div>
                            <button class="btn btn-primary" type="submit" disabled={!response}>
                                Update Result
                            </button>
                        </form>
                    </section>
                </section>
            </div>
        {/if}
    {:catch error}
        <div class="text-center text-red-600">
            Error loading plant data: {error.message}
        </div>
    {/await}
</section>
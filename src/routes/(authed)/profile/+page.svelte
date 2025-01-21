<script lang="ts">
	import Seo from "$lib/components/Seo.svelte";
    interface Prediction {
        predictions: string;
    }
    let response: Prediction = $state() as Prediction;
    let thumbnail: string | null = $state(null);
    let loading = $state(false)
    let videoSource = $state(null)

    const obtainerCamera = async () => {
        try {
            loading = true;
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoSource.srcObject = stream;
            videoSource.play();
            loading = false;
        } catch (error) {
            console.log(error);
        }
    }

    const handleFileChange = (e: Event) => {
        const file = (e.target as HTMLInputElement)?.files?.[0];
        if (file) {
            thumbnail = URL.createObjectURL(file);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        loading = true;
        const formData = new FormData();
        formData.set('gambar', e.target.gambar.files[0]);
        const request = await fetch('/predicts', {
            method: 'POST',
            body: formData
        })
        const res = await request.json();
        response = res;
        loading = false;
    }


</script>

<Seo title="Profile" />
<h1>
    This is profile page
</h1>
<section>
    <div>
        {#if loading}
            <h1>LOADING</h1>
        {/if}
        <!-- svelte-ignore a11y-media-has-caption -->
        <video bind:this={videoSource}></video>
        <button onclick={obtainerCamera}>CLICK</button>
    </div>
    <form onsubmit={handleSubmit} method="post" enctype="multipart/form-data" class="flex flex-col gap-4">
        <input 
            type="file" 
            name="gambar" 
            id="gambar" 
            accept="image/*" 
            class="file-input file-input-bordered w-full max-w-xs" 
            onchange={handleFileChange}>
        <button type="submit" class="btn btn-primary w-32">Submit</button>
    </form>

    <!-- Menampilkan thumbnail gambar jika ada -->
    {#if thumbnail}
        <div class="mt-4 flex flex-col">
            <p class="font-semibold">Thumbnail:</p>
            <section class="flex gap-x-5">
                <img src={thumbnail} alt="Thumbnail" class="w-32 h-32 object-cover rounded shadow-md" />
                {#if response}
                    <section class="flex flex-col gap-y-2">
                        <p class="text-sm font-medium">
                            Prediction: {response?.predictions.class}
                        </p>
                        <p class="text-sm font-medium">
                            Probability: {response?.predictions.confidence}
                        </p>
                    </section>
                {/if}
            </section>
        </div>
    {/if}
    {#if loading}
        <div class="mt-4 flex justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    {/if}
</section>

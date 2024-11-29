<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
    import Seo from '$lib/components/Seo.svelte';
    let { form } = $props();
</script>
<Seo title="Login" />
<section class="h-screen flex justify-center items-center w-full">
    <form
        method="POST"
        class="p-20 bg-gray-100 shadow-md rounded-xl"
        use:enhance={() => {
            return async ({ result }) => {
                pb.authStore.loadFromCookie(document.cookie);
                await applyAction(result);
            };
        }}
    >
        <h1 class="mb-8 text-2xl text-center">Login Dashboard</h1>
        <div class="form-control gap-2 flex flex-col items-center">
            <input type="email" name="email" placeholder="Email" class="input bg-white input-bordered" autocomplete="email" autocapitalize="off" autocorrect="off" />
            <input type="password" name="password" placeholder="Password" class="input bg-white input-bordered" />
            {#if form?.message}
                <p class="text-red-500 text-center">{form?.message}</p>
            {/if}
            <button class="btn bg-blue-500 hover:bg-blue-400 w-full text-white border-none mt-5">Log in</button>
        </div>
    </form>    
</section>


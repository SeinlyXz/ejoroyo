<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { goto } from "$app/navigation";
    import { userStore } from '$lib/contexts/user.svelte';
	import { pb } from "$lib/pocketbase";
</script>

<svelte:head>
    <title>E-Joroyo</title>
</svelte:head>

<section class="flex justify-center items-center h-screen w-full">
    <section class="w-full max-w-md">
        {#if userStore.isLoggedIn}
            <h1 class="text-3xl">Welcome {userStore.user?.email}</h1>
            <form action="/logout" method="POST" use:enhance={() => {
                return async ({ result }) => {
                    pb.authStore.clear()
                    await applyAction(result);
                }
            }}>
                <button type="submit">
                    Logout
                </button>
            </form>
        {:else}
            <h1 class="text-3xl">Welcome Guest</h1>
            <button onclick={()=>goto('/login')}>
                Login
            </button>
        {/if}
    </section>
</section>
<script lang="ts">
	import { userStore } from '$lib/contexts/user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/Sidebar.svelte';
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
	import { page } from '$app/stores';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	
	let currentRoute = $state($page.route.id)
	let { data, children } = $props();
	userStore.user = data.user;
	let open = $state(true)
</script>

<Sidebar.Provider bind:open>
	{#if userStore.isLoggedIn && currentRoute?.startsWith("/(authed)")}
		<AppSidebar />
		<button class="md:block hidden fixed top-1/2 z-50 bg-blue-500 hover:bg-blue-400 text-white p-1 {open ? "left-60 rounded-full" : "rounded-l-full rotate-180 left-0"} duration-300 ease-in-out" onclick={()=> open = !open} aria-label="Toggle sidebar">
			<svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
			</svg>
		</button>
	{/if}
	<section class="w-full">
		<Navbar />
		<main class="p-5">
			{@render children?.()}
		</main>
	</section>
</Sidebar.Provider>
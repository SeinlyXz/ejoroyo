<script>
	import { userStore } from '../contexts/user.svelte';
	import * as Sidebar from '../components/ui/sidebar/index';
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
	let loading = $state(false);
</script>

<nav class="flex items-center justify-between border-b-[1px] py-5 lg:px-10 md:px-7 px-5 z-50">
	<h1 class="md:text-xl text-base font-medium">
		Selamat datang, {userStore.user?.name}
	</h1>
	<section class="block md:hidden">
		<Sidebar.Trigger/>
	</section>
	<form
		action="/logout"
		method="POST"
		class="hidden md:block"
		use:enhance={() => {
			loading = true
			return async ({ result }) => {
				pb.authStore.clear();
				await applyAction(result);
				loading = false
			};
		}}
	>
		<button class="btn bg-white border border-gray-500 text-gray-500 hover:bg-gray-100"> 
			{#if loading}
				<span class="loading loading-spinner loading-sm"></span>
			{:else}
				Keluar
			{/if}
		</button>
	</form>
</nav>

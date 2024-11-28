<script>
	import { userStore } from '../contexts/user.svelte';
	import * as Sidebar from '../components/ui/sidebar/index';
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
</script>

<nav class="flex items-center justify-between border-b-[1px] p-5">
	<h1 class="md:text-xl text-base font-medium">
		Selamat datang, {userStore.user?.name}
	</h1>
	<section class="block md:hidden">
		<Sidebar.Trigger />
	</section>
	<form
		action="/logout"
		method="POST"
		class="hidden md:block"
		use:enhance={() => {
			return async ({ result }) => {
				pb.authStore.clear();
				await applyAction(result);
			};
		}}
	>
		<button class="btn bg-blue-500 text-white hover:bg-blue-400"> Logout </button>
	</form>
</nav>

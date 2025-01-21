<script lang="ts">
	import { userStore } from '$lib/contexts/user.svelte';
	import { navigating } from '$app/stores';
	import NProgress from 'nprogress';
	import '../app.css';
	let { data, children } = $props();
	userStore.user = data.user;
	
	NProgress.configure({
        minimum: 0.40,
    })
	$effect(() => {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	})
</script>

{@render children?.()}
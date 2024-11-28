<script>
	import Seo from "$lib/components/Seo.svelte";
    import { userStore } from '$lib/contexts/user.svelte';
</script>

<Seo title="Dashboard" />
<section>
    <h1>Welcome, {userStore.user?.email}</h1>
</section>
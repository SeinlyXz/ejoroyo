<!-- SEO.svelte -->
<script lang="ts">
	export let title: string = 'E-Joroyo';
	export let description: string = 'Default website description';
	export let keywords: string = 'keyword1, keyword2';
	export let author: string = 'Your Name';
	export let ogTitle: string = title;
	export let ogDescription: string = description;
	export let ogImage: string = '/default-og-image.jpg';
	export let twitterCard: string = 'summary_large_image';
	export let twitterTitle: string = title;
	export let twitterDescription: string = description;
	export let twitterImage: string = ogImage;
	export let canonicalUrl: string = '';
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content={author} />

	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={ogDescription} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:type" content="website" />
	{#if canonicalUrl}
		<meta property="og:url" content={canonicalUrl} />
	{/if}

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content={twitterCard} />
	<meta name="twitter:title" content={twitterTitle} />
	<meta name="twitter:description" content={twitterDescription} />
	<meta name="twitter:image" content={twitterImage} />

	<!-- Canonical URL -->
	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}
</svelte:head>

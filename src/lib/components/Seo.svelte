<!-- SEO.svelte -->
<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		keywords?: string;
		author?: string;
		ogTitle?: string;
		ogDescription?: string;
		ogImage?: string;
		twitterCard?: string;
		twitterTitle?: string;
		twitterDescription?: string;
		twitterImage?: string;
		canonicalUrl?: string;
	}

	let {
		title = 'E-Joroyo',
		description = 'Default website description',
		keywords = 'keyword1, keyword2',
		author = 'Your Name',
		ogTitle = title,
		ogDescription = description,
		ogImage = '/default-og-image.jpg',
		twitterCard = 'summary_large_image',
		twitterTitle = title,
		twitterDescription = description,
		twitterImage = ogImage,
		canonicalUrl = ''
	}: Props = $props();
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

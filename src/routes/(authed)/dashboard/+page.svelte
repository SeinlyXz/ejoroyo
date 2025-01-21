<script lang="ts">
	import { goto } from '$app/navigation';
	import Seo from '$lib/components/Seo.svelte';
	const alphabet = 'ABCDEFGHIJ';
	const numbers = '123';
	let { data } = $props();
	let loading = $state(false)

	interface StatsOverview {
		type: string;
		count: number;
		variant: string;
	}

	let stats_overview: StatsOverview[] = $state([])

	async function getData() {
		let req = await data?.plants
		stats_overview.push({
			type: "Healthy",
			count: req.filter(data => data.healthiness >= 80).length,
			variant: 'bg-green-300 hover:bg-green-400'
		})
		stats_overview.push({
			type: "Need Attention",
			count: req.filter(data => data.healthiness >= 60 && data.healthiness < 80).length,
			variant: 'bg-orange-300 hover:bg-orange-400'
		})
		stats_overview.push({
			type: "Sick",
			count: req.filter(data => data.healthiness >= 0 && data.healthiness < 60).length,
			variant: 'bg-red-400 hover:bg-red-500'
		})
		stats_overview.push({
			type: "Total",
			count: req.length,
			variant: 'bg-gray-100 hover:bg-gray-200'
		})
	}
	$effect(() => {
		getData()
	})
</script>

<Seo title="Dashboard" />

<section class="flex flex-col gap-y-5">
    <h1 class="text-3xl font-bold text-green-500">
		Denah Tanaman Tomat
	</h1>
	<section class="grid lg:grid-cols-10 md:grid-cols-7 grid-cols-5 lg:gap-x-28 lg:px-20 justify-items-center">
		{#each alphabet as letter}
			<h2 class="text-xl font-bold">{letter}</h2>
		{/each}
	</section>
	<section class="flex lg:gap-x-7 gap-x-3">
		<section class="flex flex-col justify-between py-16">
			{#each numbers as number}
				<h2 class="text-xl font-bold">{number}</h2>
			{/each}
		</section>
		<section class="bg-gray-100 shadow-xl p-4 grid lg:grid-cols-10 md:grid-cols-7 grid-cols-4 gap-4 rounded-xl w-full">
			{#await data?.plants}
				{#each Array(30) as _}
					<div class="skeleton aspect-square"></div>
				{/each}
			{:then plants} 
				{#each plants as plant, i}
					<button onclick={()=>goto(`/dashboard/${plant.id}`)} class="{plant.healthiness >= 80 ? "bg-green-300 hover:bg-green-400" : plant.healthiness >= 60 ? "bg-orange-300 hover:bg-orange-400" : "bg-red-400 hover:bg-red-500"} aspect-square rounded-xl flex items-center justify-center">
						<section class="flex flex-col">
							<p>
								ID: {i}
							</p>
							<p>
								{plant.healthiness}%
							</p>
						</section>
					</button>
				{/each}
			{/await}
		</section>
	</section>
	<section class="flex flex-wrap gap-3 lg:ps-10 ps-5 py-5">
		{#each stats_overview as stat}
		<section class="{stat.variant} shadow-xl rounded-xl flex items-center lg:h-52 lg:w-72 w-full h-10 lg:px-10 px-5 lg:py-0 py-12">
			<p class="text-xl">
				{stat.type} : {loading ? "Loading..." : stat.count}
			</p>
		</section>
		{/each}
	</section>
</section>
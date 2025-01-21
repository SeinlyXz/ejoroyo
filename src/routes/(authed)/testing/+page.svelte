<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { pb } from '$lib/pocketbase.js';
	import { onDestroy, onMount } from 'svelte';

	interface Tests {
		id: string;
		description: string;
	}

	let tests: Tests[] = $state([]);
	let newTestDescription = $state('');
	let unsubscribePromise: Promise<() => void>;

	onMount(async () => {
		try {
			tests = await pb.collection('Test').getFullList({ requestKey: 'testData' });
		} catch (error) {
			console.error('Auto cancel:', error);
		}
		// Buat promise untuk unsubscribe
		unsubscribePromise = new Promise((resolve) => {
			const unsubscribe = pb.collection('Test').subscribe('*', function (e) {
				if (e.action === 'create') {
					//@ts-ignore
					tests = [...tests, e.record];
				} else if (e.action === 'delete') {
					//@ts-ignore
					tests = tests.filter((test) => test.id !== e.record.id);
				}
			});

			// Resolve promise dengan fungsi unsubscribe
			resolve(unsubscribe);
		});
	});
	onDestroy(async () => {
		if (unsubscribePromise) {
			const unsubscribe = await unsubscribePromise;
			unsubscribe();
		}
	});
	let isCreating = $state(false);
	let deletingStates: Record<string, boolean> = $state({}); // Simpan status deleting per id

	async function createTest() {
		if (!newTestDescription.trim()) return;
		isCreating = true;
		try {
			if (newTestDescription === '10') {
				for (let i = 1; i <= Number(newTestDescription); i++) {
					await pb.collection('Test').create({
						description: `Test ${i}`
					});
				}
			} else {
				await pb.collection('Test').create({
					description: newTestDescription
				});
			}
			newTestDescription = '';
		} catch (error) {
			console.error('Gagal membuat test:', error);
		} finally {
			isCreating = false;
		}
	}

	async function deleteTest(id: string) {
		deletingStates = { ...deletingStates, [id]: true }; // Tandai item sedang dihapus
		try {
			await pb.collection('Test').delete(id);
		} catch (error) {
			console.error('Gagal menghapus test:', error);
		} finally {
			deletingStates = { ...deletingStates, [id]: false }; // Reset status
		}
	}
</script>

<Seo title="Testing" />
<section>
	<form onsubmit={createTest} class="flex w-full gap-x-3">
		<input
			type="text"
			bind:value={newTestDescription}
			placeholder="Masukkan deskripsi baru"
			class="input input-bordered w-[80%] lg:w-[90%]"
			required
		/>
		<button type="submit" class="btn w-[20%] bg-[#006A4E] text-white hover:bg-[#2c7d68] lg:w-[10%]">
			{isCreating ? 'Creating...' : 'Create'}
		</button>
	</form>
	<section class="flex flex-col gap-y-2 py-5">
		{#each tests as test, i}
			<section
				class="flex items-center justify-between gap-x-3 rounded-xl ps-3 duration-150 ease-in-out hover:bg-gray-200"
			>
				<p>
					{i + 1}. {test.description}
				</p>
				<button
					onclick={() => deleteTest(test.id)}
					class="btn btn-error w-20 text-white"
					disabled={deletingStates[test.id]}
				>
					{deletingStates[test.id] ? 'Deleting...' : 'Delete'}
				</button>
			</section>
		{/each}
	</section>
</section>

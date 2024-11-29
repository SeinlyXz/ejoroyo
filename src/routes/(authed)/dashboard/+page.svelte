<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { pb } from '$lib/pocketbase.js';
	import { onMount } from 'svelte';

	interface Tests {
        id: string;
		description: string; 
	}
    
	let tests: Tests[] = $state([]);
	let newTestDescription = $state('');

	onMount(async () => {
        pb.beforeSend = function (url, options){
            //@ts-ignore
            options.headers['ngrok-skip-browser-warning'] = 'true'
            return { url, options }
        }
		try {
			tests = await pb.collection('Test').getFullList({});
		} catch (error) {
			console.error('Subscription error:', error);
		}
		// Subscribe ke perubahan koleksi
		pb.collection('Test').subscribe('*', function (e) {
			if (e.action === 'create') {
                //@ts-ignore
				tests = [...tests, e.record];
			} else if (e.action === 'delete') {
                //@ts-ignore
                tests = tests.filter(test => test.id !== e.record.id);
            }
		});
	});

	async function createTest() {
		if (!newTestDescription.trim()) return;

		try {
			await pb.collection('Test').create({
				description: newTestDescription
			});
			
			newTestDescription = ''; // Reset input
		} catch (error) {
			console.error('Gagal membuat test:', error);
		}
	}

    async function deleteTest(id: string) {
        try {
            await pb.collection('Test').delete(id);
        } catch (error) {
            console.error('Gagal menghapus test:', error);
        }
    }
</script>

<Seo title="Dashboard" />
<section>
	<form onsubmit={createTest} class="w-full flex gap-x-3">
        <input 
            type="text" 
            bind:value={newTestDescription} 
            placeholder="Masukkan deskripsi baru"
            class="input input-bordered w-[90%]"
        />
        <button type="submit" class="btn btn-primary w-[10%]">Tambah</button>
    </form>
    <section class="p-5 flex flex-col gap-y-3">
        {#each tests as test, i}
            <section class="flex gap-x-3">
                <p>
                    {i+1}. {test.description}
                </p>
                <button onclick={() => deleteTest(test.id)} class="btn btn-error text-white w-20">
                    delete
                </button>
            </section>
        {/each}
    </section>
</section>
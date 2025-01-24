<script lang="ts">
	import Message from 'lucide-svelte/icons/message-circle';
	import House from 'lucide-svelte/icons/house';
	import Logout from 'lucide-svelte/icons/log-out'
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/stores';
	import logo from '$lib/images/logo.png';
	const items = [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: House
		},
		{
			title: 'Websocket Testing',
			url: '/testing',
			icon: Message
		}
	];
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
	const sidebar = useSidebar();
	let isOpen = $state(sidebar.open);
	$effect(() => {
		isOpen = sidebar.open;
	});
</script>

<Sidebar.Root class="py-4" collapsible="icon">
	<Sidebar.Header>
		<section class="flex items-center gap-x-3 {isOpen ? 'p-3 shadow-xl' : ''} w-full rounded-xl">
			<img src={logo} alt="" class="w-10" />
			<p class="font-medium {isOpen ? 'opacity-100 ms-0' : 'opacity-0 -ms-20'} duration-150 ease-in-out">E-Joroyo</p>
		</section>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive={$page.url.pathname.startsWith(item.url)}>
								{#snippet child({ props }: { props: any })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
					<Sidebar.MenuItem>
						<form
							action="/logout"
							method="POST"
							class="block md:hidden"
							use:enhance={() => {
								return async ({ result }) => {
									pb.authStore.clear();
									await applyAction(result);
								};
							}}
						>
							<button class="flex items-center gap-x-1 px-2 py-1 rounded-md w-full hover:bg-gray-100">
								<Logout class="w-5"/>
								{isOpen ? "Logout" : ""}
							</button>
						</form>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<p class="px-5 py-2 {isOpen ? 'opacity-100 ms-0' : '-ms-52 opacity-0'} duration-300 ease-in-out text-xs">All rights reserved © 2024</p>
	</Sidebar.Footer>
</Sidebar.Root>

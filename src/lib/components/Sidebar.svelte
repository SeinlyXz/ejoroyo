<script lang="ts">
	import Calendar from 'lucide-svelte/icons/calendar';
	import House from 'lucide-svelte/icons/house';
	import Inbox from 'lucide-svelte/icons/inbox';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/stores';
	let currentUrl = $state($page.url.pathname)
	// Menu items.
	const items = [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: House
		},
		{
			title: 'Profile',
			url: '/profile',
			icon: Inbox
		},
	];
</script>

<Sidebar.Root class="py-4">
	<Sidebar.Header>
		<h1>
			<a href="/dashboard" class="w-full px-20 py-3 rounded-md btn btn-primary text-white">E-Joroyo</a>
		</h1>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive={item.url === $page.url.pathname}>
								{#snippet child({ props }: {props: any})}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<p class="px-5 py-2">
			All rights reserved © 2023
		</p>
	</Sidebar.Footer>
</Sidebar.Root>

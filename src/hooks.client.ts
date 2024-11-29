import { pb } from '$lib/pocketbase';
import { userStore } from '$lib/contexts/user.svelte';

pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
    userStore.user = pb.authStore.record;
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
}, true);

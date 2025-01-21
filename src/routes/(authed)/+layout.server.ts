import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const callbackUrl = url.pathname.toString().split('/')[1] || null;
    const token = url.searchParams.get('token')
	if (!locals.user || token == 'adminGanteng12345') {
        if (callbackUrl) {
            redirect(303, `/login?callback=${callbackUrl}`);
        } else {
		    redirect(303, '/login');
        }
	}
};

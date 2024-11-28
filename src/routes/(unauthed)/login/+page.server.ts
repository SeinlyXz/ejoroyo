import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  default: async ({ locals, request, url }) => {
    const callbackUrl = url.searchParams.get('callback');
    const data = Object.fromEntries(await request.formData()) as {
      email: string
      password: string
    }

    try {
      await locals.pb.collection('users').authWithPassword(data.email, data.password)
    } catch (e) {
      return fail(401, { message: 'Invalid email or password' })
    }
    if(callbackUrl) {
        return redirect(303, `/${callbackUrl}`);
    } else {
        return redirect(303, '/dashboard');
    }
  },
}
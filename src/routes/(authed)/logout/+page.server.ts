import { redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ locals }) => {
    locals.pb.authStore.clear()
    locals.user = null
    return redirect(303, '/')
  },
}
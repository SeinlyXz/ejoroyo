import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import PocketBase from 'pocketbase'

export function createInstance() {
  return new PocketBase("https://2765-2001-448a-4042-8537-b82e-ecaf-217c-49a7.ngrok-free.app")
}

export const pb = createInstance()
// user.ts
import type { AuthModel } from 'pocketbase';
import { pb } from '$lib/pocketbase';

export class UserStore {
    private _user = $state<AuthModel | null>(null);

    get user() {
        return this._user;
    }

    set user(value: AuthModel | null) {
        this._user = value;
    }

    get isLoggedIn() {
        return !!this._user;
    }

    login(user: AuthModel) {
        this._user = user;
    }

    logout() {
        this._user = null;
        pb.authStore.clear();
    }

    update(userData: Partial<AuthModel>) {
        if (this._user) {
            this._user = { ...this._user, ...userData };
        }
    }
}

// Create a singleton instance
export const userStore = new UserStore();
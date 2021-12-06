import { writable } from 'svelte/store';

export const currentUser = () => {
  const { subscribe, set } = writable('init');
  return {
    subscribe,
    signout: () => { set(null) },
		signin:  (user) => { set(user) }
	}
}
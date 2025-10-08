import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';
const initial: Theme = (browser && (localStorage.getItem('theme') as Theme)) || 'light';

export const theme = writable<Theme>(initial);

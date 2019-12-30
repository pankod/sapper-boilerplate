import { writable } from 'svelte/store';

export const photoOfTheDay = writable();

export const imageUrl = writable();

export const imageTitle = writable("");

export const copyright = writable("");

export const searchTerm = writable("");

export const searchResults = writable([]);

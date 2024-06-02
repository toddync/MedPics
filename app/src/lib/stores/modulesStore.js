import { writable } from "svelte/store";

export const modules = writable({
	queried: false,
	current: {},
	contents: [],
});

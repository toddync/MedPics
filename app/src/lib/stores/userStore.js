import { writable } from "svelte/store";

export const user = writable({
	data: undefined,
	professor: undefined,
});

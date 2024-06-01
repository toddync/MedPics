import { writable } from "svelte/store";

export const quizzes = writable({
	queried: false,
	current: {},
	contents: [],
});

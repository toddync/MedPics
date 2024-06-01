<script lang="ts">
	//@ts-nocheck
	import { user } from "$lib/stores/userStore";
	import { onMount } from "svelte";
	import { navigate } from "svelte-routing";
	import { writable } from "svelte/store";
	import { databases } from "../../appwrite";
	import { modules } from "$lib/stores/modulesStore";
	import Loader from "$lib/components/Loader.svelte";

	$: $user.data == undefined && $user.data == {} && navigate("/Login");

	const module = writable({
		data: {},
		queried: false,
	});
	export let id = "";

	async function start() {
		$module.data = await databases.getDocument(
			"6657af020009478061c0",
			"6657af150036aa592e15",
			id,
		);
		$module.queried = true;
		document.getElementById("content").innerHTML = $module.data.content;
		$modules.current = $module.data;
	}

	onMount(start);
</script>

{#if !$module.queried}
	<Loader />
{/if}
<div
	class="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl min-w-full pl-7"
	id="content"
/>

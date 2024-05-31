<script lang="ts">
	//@ts-nocheck
	import Home from "lucide-svelte/icons/home";

	import { showSearch } from "../stores/searchStore";

	import { navigate } from "svelte-routing";
	const goto = (to: string) => (($showSearch = false) || 1) && navigate(to);

	import { modules } from "$lib/stores/modulesStore";
	import { Blocks } from "lucide-svelte";
	import { onMount } from "svelte";
	import * as Command from "./ui/command";
	onMount(() => {
		function handleKeydown(e) {
			if (e.key.toLocaleLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				$showSearch = !$showSearch;
			}
		}

		document.addEventListener("keydown", handleKeydown);
		return () => {
			document.removeEventListener("keydown", handleKeydown);
		};
	});
</script>

<Command.Dialog bind:open={$showSearch}>
	<Command.Input placeholder="Search..." />
	<Command.List>
		<Command.Empty class="text-muted-foreground">
			Nenhum resultado econtrado...
		</Command.Empty>
		<Command.Group heading="Pages">
			<Command.Item onSelect={() => goto("/")}>
				<Home />
				<span class="ml-1">Home</span>
			</Command.Item>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Módulos">
			{#if $modules.queried}
				{#each $modules?.contents?.documents || [] as module}
					<Command.Item
						onSelect={() =>
							(navigate(`/Module/${module.$id}`) || true) &&
							($showSearch = false)}
					>
						<Blocks />
						<span class="ml-1">{module.titulo}</span>
					</Command.Item>
				{/each}
			{:else}
				<Command.Item>
					<span class="mx-auto h-fit text-muted-foreground">
						Nenhum módulo registrado...
					</span>
				</Command.Item>
			{/if}
		</Command.Group>
	</Command.List>
</Command.Dialog>

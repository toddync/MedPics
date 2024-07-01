<script lang="ts">
	//@ts-nocheck
	import { modules } from "$lib/stores/modulesStore";
	import { Blocks, BookMarked, Plus } from "lucide-svelte";
	import Home from "lucide-svelte/icons/home";
	import { onMount } from "svelte";
	import { navigate } from "svelte-routing";
	import { showSearch } from "../stores/searchStore";
	import { user } from "../stores/userStore";

	const goto = (to: string) => (($showSearch = false) || 1) && navigate(to);

	import * as Command from "./ui/command";
	import { quizzes } from "$lib/stores/quizzesStore";
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

			<Command.Item onSelect={() => goto("/Quizzes")}>
				<BookMarked />
				<span class="ml-1">Quizzes</span>
			</Command.Item>

			{#if $user.professor}
				<Command.Item onSelect={() => goto("/NewModule")}>
					<div class="relative h-fit my-auto">
						<Plus
							class="absolute translate-x-1/2 -translate-y-1/2 top-1.5 right-1.5 max-w-2.5 z-50"
						/>
						<div
							class="absolute bg-background top-[1px] right-0 size-2.5"
						/>

						<Blocks />
					</div>
					<span class="ml-1">New Module</span>
				</Command.Item>

				<Command.Item onSelect={() => goto("/NewQuiz")}>
					<div class="relative h-fit my-auto">
						<Plus
							class="absolute translate-x-1/2 -translate-y-1/2  z-50 bg-black  top-[1px] right-1 max-w-2.5 max-h-2.5"
						/>
						<BookMarked />
					</div>

					<span>
						<p class="ml-1">New Quiz</p>
					</span>
				</Command.Item>
			{/if}
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Módulos">
			{#if $modules.queried}
				{#each $modules?.contents?.documents || [] as module}
					<Command.Item
						itemid={module.$id}
						onSelect={() =>
							(navigate(`/MedPics/?page=Module&id=${module.$id}`) || true) &&
							($showSearch = false)}
					>
						<Blocks />
						<span class="ml-1">{module.titulo}</span>
					</Command.Item>
				{/each}
			{:else}
				<Command.Item>
					<span class="mx-auto h-fit text-muted-foreground">
						Loading...
					</span>
				</Command.Item>
			{/if}
		</Command.Group>

		<Command.Group heading="Quizzes">
			{#if $quizzes.queried}
				{#each $quizzes?.contents?.documents || [] as quiz}
					<Command.Item
						itemid={quiz.$id}
						onSelect={() =>
							(navigate(`/MedPics/?page=Quiz&id=${quiz.$id}`) || true) &&
							($showSearch = false)}
					>
						<BookMarked />
						<span class="ml-1">{quiz.titulo}</span>
					</Command.Item>
				{/each}
			{:else}
				<Command.Item>
					<span class="mx-auto h-fit text-muted-foreground">
						Loading...
					</span>
				</Command.Item>
			{/if}
		</Command.Group>
	</Command.List>
</Command.Dialog>

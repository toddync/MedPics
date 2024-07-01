<script lang="ts">
	//@ts-nocheck
	import Loader from "$lib/components/Loader.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { quizzes } from "$lib/stores/quizzesStore";
	import { user } from "$lib/stores/userStore";
	import { BookMarked } from "lucide-svelte";
	import { navigate } from "svelte-routing";

	$: $user.data == undefined && $user.data == {} && navigate("/MedPics/?page=Login");
</script>

<div class="h-full pl-7 grid auto-rows-max md:grid-cols-2 lg:grid-cols-3 gap-5">
	{#if $quizzes.queried}
		{#each $quizzes.contents.documents || [] as quiz}
			<Button
				class="bg-transparent h-fit text-start p-0 hover:bg-transparent"
				on:click={() => {
					navigate(`/MedPics/?page=Quiz&id=${quiz.$id}`);
				}}
			>
				<Card.Root
					class="h-full w-full group hover:scale-105 transition-all duration-100 ease-linear"
				>
					<Card.Header>
						<Card.Title class="text-2xl text-wrap flex">
							{quiz.titulo}
							<BookMarked
								class="ml-auto w-9 group-hover:text-lime-400"
							/>
						</Card.Title>
						<Card.Description class="text-wrap h-full">
							{quiz.descricao}
						</Card.Description>
					</Card.Header>
				</Card.Root>
			</Button>
		{/each}
	{:else}
		<Loader />
	{/if}
</div>

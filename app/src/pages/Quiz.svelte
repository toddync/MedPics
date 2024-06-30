<script lang="ts">
	//@ts-nocheck
	import Loader from "$lib/components/Loader.svelte";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { databases, db, quizzesDB } from "../../appwrite";
	import * as Card from "$lib/components/ui/card";
	import * as RadioGroup from "$lib/components/ui/radio-group";
	import { Button } from "$lib/components/ui/button";
	import { navigate } from "svelte-routing";
	import { quizzes } from "$lib/stores/quizzesStore";

	const quiz = writable({
		data: {},
		queried: false,
	});

	const responses = writable([]);

	export let id;

	async function start() {
		$quiz.data = await databases.getDocument(db, quizzesDB, id);
		$quiz.data.questoes = JSON.parse($quiz.data.questoes);
		$quiz.queried = true;

		$quiz.data.questoes.forEach((_, i) => {
			$responses[i] = null;
		});

		$quizzes.current = $quiz.data;
	}
	onMount(start);

	$: console.log($responses);
</script>

<div class="h-full pl-7 grid auto-rows-max gap-5">
	{#if $quiz.queried}
		<Card.Root class="mx-auto w-[90svw] md:w-3/5">
			<Card.Header>
				<Card.Title class="text-2xl">
					{$quiz.data.titulo}
				</Card.Title>
				<Card.Description>
					{$quiz.data.descricao}
				</Card.Description>
			</Card.Header>
		</Card.Root>

		{#each $quiz.data.questoes as questão, i}
			<Card.Root class="mx-auto w-[90svw] md:w-3/5">
				<Card.Header>
					<Card.Title class="text-2xl">
						{questão.titulo}
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<RadioGroup.Root bind:value={$responses[i]}>
						{#each questão.respostas as resposta, i}
							<div class="flex gap-2 h-fit p-2">
								<RadioGroup.Item
									class="h-fit my-auto"
									value={`${i}`}
								/>
								<p class="h-fit my-auto">{resposta}</p>
							</div>
						{/each}
					</RadioGroup.Root>
				</Card.Content>
			</Card.Root>
		{/each}

		<Button
			class="w-fit mx-auto font-extrabold"
			on:click={() =>
				navigate(`/index.html?page=QuizResults&id=${id}&responses=${JSON.stringify($responses)}`)}
			>Ver resultados</Button
		>
	{:else}
		<Loader />
	{/if}
</div>

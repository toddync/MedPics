<script lang="ts">
	//@ts-nocheck
	import Loader from "$lib/components/Loader.svelte";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { databases, db, quizzesDB } from "../../appwrite";
	import * as Card from "$lib/components/ui/card";
	import * as RadioGroup from "$lib/components/ui/radio-group";
	import { Button } from "$lib/components/ui/button";

	const quiz = writable({
		data: {},
		queried: false,
	});

	export let id;
	export let responses;

	async function start() {
		$quiz.data = await databases.getDocument(db, quizzesDB, id);
		$quiz.data.questoes = JSON.parse($quiz.data.questoes);
		$quiz.queried = true;
	}

	onMount(start);
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
					<RadioGroup.Root value={responses[i]} disabled>
						{#each questão.respostas as resposta, v}
							<div
								class={"flex gap-2 h-fit rounded-lg p-2 bg-opacity-10 " +
									((questão.correta == `${v}` &&
										"bg-lime-400") ||
										(responses[i] == `${v}` &&
											"bg-red-400"))}
							>
								<RadioGroup.Item
									class="h-fit my-auto"
									value={`${v}`}
								/>
								<p class="h-fit my-auto">{resposta}</p>
							</div>
						{/each}
					</RadioGroup.Root>
				</Card.Content>
			</Card.Root>
		{/each}
	{:else}
		<Loader />
	{/if}
</div>

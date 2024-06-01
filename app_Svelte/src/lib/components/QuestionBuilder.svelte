<script lang="ts">
	//@ts-nocheck
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as RadioGroup from "$lib/components/ui/radio-group";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Plus, X } from "lucide-svelte";
	import ResponseBuilder from "./ResponseBuilder.svelte";

	export let i;
	export let quiz;
	export let errors;
	export let errorClass;
</script>

<Card.Root class="mx-auto w-[90svw] md:w-3/5">
	<Card.Header class="grid gap-3">
		<Button
			class="ml-auto my-auto text-red-400 hover:text-red-900"
			size="icon"
			variant="outline"
			on:click={() => {
				$quiz.questoes.splice(i, 1);
				$quiz.questoes = $quiz.questoes;

				if (!$errors?.questoes) $errors.questoes = [];

				$errors.questoes.splice(i, 1);
				$errors.questoes = $errors.questoes;
			}}
		>
			<X />
		</Button>
		<Card.Title class="grid gap-1">
			{#if $errors}
				{#if $errors?.questoes[i]?.titulo}
					<p class={`${errorClass} mx-auto`}>
						{$errors?.questoes[i]?.titulo}
					</p>
				{/if}
			{/if}

			<Textarea class="text-xl" bind:value={$quiz.questoes[i].titulo} />
		</Card.Title>
	</Card.Header>
	<Card.Content class="grid">
		<RadioGroup.Root bind:value={$quiz.questoes[i].correta}>
			{#each $quiz?.questoes[i]?.respostas || [] as _, pos}
				<ResponseBuilder {i} {pos} {quiz} {errors} {errorClass} />
			{/each}
		</RadioGroup.Root>

		{#if $errors}
			{#if $errors.questoes}
				{#if $errors.questoes[i]}
					{#if typeof $errors.questoes[i].respostas == "string"}
						<p class={`${errorClass} mx-auto`}>
							{$errors.questoes[i].respostas}
						</p>
					{/if}
				{/if}
			{/if}
		{/if}

		<Button
			size="icon"
			variant="outline"
			class="mt-3 mx-auto"
			on:click={() => {
				$quiz.questoes[i].respostas[
					$quiz?.questoes[i]?.respostas?.length || 0
				] = "";

				if (!$errors?.questoes) $errors.questoes = [];
				if (!$errors?.questoes[i]) $errors.questoes[i] = {};
				if (!$errors?.questoes[i].respostas)
					$errors.questoes[i].respostas = [];

				$errors.questoes[i].respostas[
					$errors?.questoes[i]?.respostas?.length || 0
				] = "";
			}}
		>
			<Plus />
		</Button>
	</Card.Content>
</Card.Root>

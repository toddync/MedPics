<script lang="ts">
	//@ts-nocheck
	import { Button } from "$lib/components/ui/button";
	import * as RadioGroup from "$lib/components/ui/radio-group";
	import { Textarea } from "$lib/components/ui/textarea";
	import { X } from "lucide-svelte";

	export let i;
	export let pos;
	export let quiz;
	export let errors;
	export let errorClass;
</script>

{#if $errors}
	{#if $errors.questoes}
		{#if $errors.questoes[i]}
			{#if $errors.questoes[i].respostas}
				{#if typeof $errors?.questoes[i]?.respostas != "string"}
					{#if $errors.questoes[i].respostas[pos]}
						<p class={`${errorClass} mx-auto`}>
							{$errors.questoes[i].respostas[pos]}
						</p>
					{/if}
				{/if}
			{/if}
		{/if}
	{/if}
{/if}

<div class="flex gap-2">
	<RadioGroup.Item value={`${pos}`} class="my-auto" />
	<Textarea class="text-lg" bind:value={$quiz.questoes[i].respostas[pos]} />
	<Button
		class="my-auto text-red-400 hover:text-red-900"
		size="icon"
		variant="outline"
		on:click={() => {
			$quiz?.questoes[i]?.respostas?.splice(pos, 1);
			$quiz.questoes[i].respostas = $quiz?.questoes[i]?.respostas || [];

			$quiz?.questoes[i]?.correta == pos &&
				($quiz.questoes[i].correta = "0");

			if (!$errors?.questoes) $errors.questoes = [];
			if (!$errors?.questoes[i]) $errors.questoes[i] = {};
			if (!$errors?.questoes[i].respostas)
				$errors.questoes[i].respostas = [];

			$errors?.questoes[i]?.respostas?.splice(pos, 1);
			$errors.questoes[i].respostas =
				$errors?.questoes[i]?.respostas || [];
		}}
	>
		<X />
	</Button>
</div>

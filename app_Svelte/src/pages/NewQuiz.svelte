<script lang="ts">
	//@ts-nocheck
	import QuestionBuilder from "$lib/components/QuestionBuilder.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Plus } from "lucide-svelte";
	import { writable } from "svelte/store";
	import { z } from "zod";
	import { databases } from "../../appwrite";
	import { navigate } from "svelte-routing";
	import { v4 as uuidv4 } from "uuid";
	import { user } from "$lib/stores/userStore";
	import Loader from "$lib/components/Loader.svelte";

	function setValueAtPath(object, path, value) {
		if (!Array.isArray(path) || path.length === 0) {
			return object;
		}

		let current = object;

		for (let i = 0; i < path.length - 1; i++) {
			const key = path[i];
			if (!current[key] || typeof current[key] !== "object") {
				current[key] = {};
			}
			current = current[key];
		}

		current[path[path.length - 1]] = value;
		return object;
	}

	const schema = z.object({
		titulo: z.string().min(4, "Min 4").max(50, "Max 50"),
		descricao: z.string().max(500, "Max 500"),
		questoes: z
			.array(
				z.object({
					titulo: z.string().min(3, "Min 3"),
					correta: z.string().min(1),
					respostas: z
						.array(z.string().min(1, "Min 1"))
						.min(1, "Min 1"),
				}),
			)
			.min(1, "Min 1"),
	});

	const errorClass = "text-xs text-red-400 m-0 p-0";

	const errors = writable({
		titulo: "",
		descricao: "",
		questoes: [
			{
				titulo: "",
				respostas: [""],
			},
		],
	});
	const quiz = writable({
		creator_id: $user.data?.userId,
		titulo: "",
		descricao: "",
		questoes: [
			{
				titulo: "",
				correta: "0",
				respostas: [""],
			},
		],
	});

	const load = writable(false);

	async function create() {
		let valid = true;
		try {
			schema.parse($quiz);
		} catch (err) {
			$errors = {
				titulo: "",
				descricao: "",
				questoes: [],
			};
			valid = false;
			JSON.parse(err.message).map((error) => {
				$errors = setValueAtPath($errors, error.path, error.message);
			});
		}

		if (!valid) return;
		$load = true;
		await databases.createDocument(
			"6657af020009478061c0",
			"6659fcb5000c04c447db",
			uuidv4(),
			{
				...$quiz,
				questoes: JSON.stringify($quiz.questoes),
				creator_id: $user.data.userId,
			},
		);

		navigate("/Quizzes");
	}

	$: $user.data !== undefined && $user.professor == false && navigate("/");
</script>

{#if $load}
	<Loader />
{:else}
	<div class="h-full pl-7 grid gap-5">
		<Card.Root class="mx-auto w-[90svw] md:w-3/5">
			<Card.Header>
				<Card.Title class="grid gap-1">
					<Label class="text-xl flex gap-2"
						>Titulo:
						{#if $errors?.titulo}
							<p class={`${errorClass} h-fit my-auto`}>
								{$errors?.titulo}
							</p>
						{/if}
					</Label>
					<Textarea class="text-xl" bind:value={$quiz.titulo} />
				</Card.Title>
			</Card.Header>
		</Card.Root>

		<Card.Root class="mx-auto w-[90svw] md:w-3/5">
			<Card.Header>
				<Card.Title class="grid gap-1">
					<Label class="text-lg flex gap-2">
						Descrição:
						{#if $errors?.descricao}
							<p class={`${errorClass} h-fit my-auto`}>
								{$errors?.descricao}
							</p>
						{/if}
					</Label>
					<Textarea
						class="font-normal text-lg"
						bind:value={$quiz.descricao}
					/>
				</Card.Title>
			</Card.Header>
		</Card.Root>

		{#each $quiz.questoes as _, i}
			<QuestionBuilder {i} {quiz} {errors} {errorClass} />
		{/each}

		<div class="w-fit mx-auto flex gap-3">
			<div class="grid">
				{#if typeof $errors.questoes == "string"}
					<p class={`${errorClass} mx-auto`}>
						{$errors.questoes}
					</p>
				{/if}
				<Button
					size="icon"
					variant="outline"
					class="my-auto"
					on:click={() => {
						$quiz.questoes[$quiz.questoes.length] = {
							titulo: "",
							correta: 0,
							respostas: [""],
						};

						$errors.questoes[$errors.questoes.length] = {
							titulo: "",
							correta: 0,
							respostas: [""],
						};
					}}
				>
					<Plus />
				</Button>
			</div>

			<Button class="my-auto font-extrabold" on:click={create}>
				Criar Quiz
			</Button>
		</div>
	</div>
{/if}

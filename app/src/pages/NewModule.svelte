<script lang="ts">
	//@ts-nocheck
	import Editor from "$lib/components/Editor.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import { user } from "$lib/stores/userStore";
	import { onMount } from "svelte";
	import { navigate } from "svelte-routing";
	import { writable } from "svelte/store";
	import { v4 as uuidv4 } from "uuid";
	import { z } from "zod";
	import { databases, db, modulesDB } from "../../appwrite";

	const schema = z.object({
		content: z
			.string()
			.min(10, "Min size of 10")
			.max(10000, "Max size of 10000"),
		titulo: z
			.string()
			.min(4, { message: "Min size of 4" })
			.max(50, "Max size of 50"),
		descricao: z.string().max(500, "Max size of 500"),
	});

	const errors = writable({
		content: [],
		titulo: [],
		descricao: [],
	});
	const data = writable({
		content: "",
		titulo: "",
		descricao: "",
		creator_id: $user.data?.userId,
	});

	function normalize(error) {
		const errors = {
			content: [],
			titulo: [],
			descricao: [],
		};

		error.forEach((err) => {
			errors[err.path[0]].push(err.message);
		});

		return errors;
	}

	async function create() {
		try {
			schema.parse($data);
			await databases.createDocument(db, modulesDB, uuidv4(), $data);
			navigate("/MedPics/?page=Home");
		} catch (error) {
			$errors = normalize(JSON.parse(error.message));
		}
	}

	function start() {}
	onMount(start);

	$: $user.data !== undefined && $user.professor == false && navigate("/MedPics/?page=Home");
	$: console.log($errors);
</script>

<div class="h-full pl-7 grid auto-rows-max gap-10">
	<div>
		<Label class="text-xl">
			<div class="flex gap-2">
				Título:
				<p
					class={`text-xs text-red-400 ${($errors?.titulo?.[0] && "visible") || "invisible size-0"} my-auto h-fit m-0 p-0`}
				>
					{$errors?.titulo?.[0]}
				</p>
			</div>
			<Input on:input={(e) => ($data.titulo = e.target.value)} />
		</Label>
	</div>

	<div>
		<Label class="text-xl">
			<div class="flex gap-2">
				Descrição:
				<p
					class={`text-xs text-red-400 ${($errors?.descricao?.[0] && "visible") || "invisible size-0"} my-auto h-fit m-0 p-0`}
				>
					{$errors?.descricao?.[0]}
				</p>
			</div>
			<Textarea on:input={(e) => ($data.descricao = e.target.value)} />
		</Label>
	</div>

	<div>
		<Label class="text-xl flex gap-2"
			>Conteudo:
			<p
				class={`text-xs text-red-400 ${($errors?.content?.[0] && "visible") || "invisible size-0"} my-auto h-fit m-0 p-0`}
			>
				{$errors?.content?.[0]}
			</p>
		</Label>
		<Editor change={(x) => ($data.content = x)} />
	</div>

	<Button class="w-fit mx-auto font-extrabold" on:click={create}>
		Criar Módulo
	</Button>
</div>

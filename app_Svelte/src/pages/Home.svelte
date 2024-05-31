<script lang="ts">
	//@ts-nocheck
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { modules } from "$lib/stores/modulesStore";
	import { user } from "$lib/stores/userStore";
	import { Blocks } from "lucide-svelte";
	import { navigate } from "svelte-routing";

	$: $user.data == undefined && $user.data == {} && navigate("/Login");
</script>

<div class="h-full pl-7 grid auto-rows-max md:grid-cols-2 lg:grid-cols-3 gap-5">
	{#if $modules.queried}
		{#each $modules.contents.documents || [] as module}
			<Button
				class="bg-transparent h-fit text-start p-0 hover:bg-transparent"
				on:click={() => {
					navigate(`/Module/${module.$id}`);
				}}
			>
				<Card.Root
					class="h-full w-full group hover:scale-105 transition-all duration-100 ease-linear"
				>
					<Card.Header>
						<Card.Title class="text-2xl text-wrap flex">
							{module.titulo}
							<Blocks
								class="ml-auto w-9 group-hover:text-lime-400"
							/>
						</Card.Title>
						<Card.Description class="text-wrap h-full">
							{module.descricao || ""}
						</Card.Description>
					</Card.Header>
				</Card.Root>
			</Button>
		{/each}
	{:else}
		<span class="absolute inset-0 text-center top-1/2">Loading</span>
	{/if}
</div>

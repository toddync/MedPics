<script lang="ts">
	//@ts-nocheck
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { writable } from "svelte/store";
	import { navigate } from "svelte-routing";
	import { z } from "zod";
	import { user } from "$lib/stores/userStore";

	const schema = z.object({
		email: z.string().email("input a valid e-mail"),
		password: z
			.string()
			.min(8, { message: "Must have at least 8 characters" }),
	});

	function normalize(error) {
		const errors = { email: [], password: [] };

		error.forEach((err) => {
			errors[err.path[0]].push(err.message);
		});

		return errors;
	}

	function login() {
		try {
			schema.parse($credentials);
		} catch (error) {
			$errors = normalize(JSON.parse(error.message));
		}
	}

	const errors = writable({});
	const credentials = writable({
		email: "",
		password: "",
	});

	$: $user.data !== undefined && navigate("/");
</script>

<Card.Root class="absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2">
	<Card.Header>
		<Card.Title>Log in</Card.Title>
		<Card.Description>
			Enter your credentials to log in to the system
		</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-5">
		<div class="flex flex-col space-y-1.5">
			<span class="flex gap-4">
				<Label for="email">Email</Label>
				<p
					class={`text-xs text-red-400 ${($errors?.email?.[0] && "visible") || "invisible size-0"} my-auto h-fit m-0 p-0`}
				>
					{$errors?.email?.[0]}
				</p>
			</span>
			<Input
				id="email"
				placeholder="max@example.com"
				value={$credentials.email}
				on:input={(e) => ($credentials.email = e.target?.value)}
			/>
		</div>
		<div class="flex flex-col space-y-1.5">
			<span class="flex gap-4">
				<Label for="email">Password</Label>
				<p
					class={`text-xs text-red-400 ${($errors?.password?.[0] && "visible") || "invisible size-0"} my-auto h-fit m-0 p-0`}
				>
					{$errors?.password?.[0]}
				</p>
			</span>
			<Input
				id="pass"
				placeholder="max123"
				value={$credentials.password}
				on:input={(e) => ($credentials.password = e.target?.value)}
			/>
		</div>
	</Card.Content>
	<Card.Footer class="justify-between gap-5">
		<span class="flex gap-1">
			<p class="text-xs my-auto">Don't have an account?</p>
			<Button class="font-bold p-1.5" variant="ghost">Sign up</Button>
		</span>
		<Button class="font-bold" variant="outline" on:click={login}
			>Log in</Button
		>
	</Card.Footer>
</Card.Root>

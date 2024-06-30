<script lang="ts">
	//@ts-nocheck
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { user } from "$lib/stores/userStore";
	import { navigate } from "svelte-routing";
	import { writable } from "svelte/store";
	import { z } from "zod";
	import { account, professorsTeam, teams } from "../../appwrite";

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

	async function login() {
		try {
			schema.parse($credentials);
			try {
				await account.createEmailPasswordSession(
					$credentials.email,
					$credentials.password,
				);

				$user.data = (await account.getSession("current")) || {};
				try {
					await teams.get(professorsTeam);
					$user.professor = true;
				} catch (e) {}

				navigate("/index.html?page=Home");
			} catch (e) {
				$errors.email = ["incorrect email or password"];
				$errors.password = ["incorrect email or password"];
			}
		} catch (error) {
			$errors = normalize(JSON.parse(error.message));
		}
	}

	const errors = writable({});
	const credentials = writable({
		email: "",
		password: "",
	});

	$: $user.data !== undefined && navigate("/index.html?page=Home");
</script>

<Card.Root
	class="absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 w-[90svw] md:w-2/6 md:min-w-[400px]"
>
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
				type="email"
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
				type="password"
				placeholder="max123"
				value={$credentials.password}
				on:input={(e) => ($credentials.password = e.target?.value)}
			/>
		</div>
		<div class="flex justify-between gap-5">
			<span class="flex h-fit gap-1 my-auto">
				<p class="text-xs mt-auto">Don't have an account?</p>

				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<p
					on:click={() => navigate("/index.html?page=Signup")}
					class="text-sm h-min font-semibold mt-auto cursor-pointer"
				>
					Sign up
				</p>
			</span>

			<Button class="font-bold" variant="outline" on:click={login}>
				Log in
			</Button>
		</div>
	</Card.Content>
</Card.Root>

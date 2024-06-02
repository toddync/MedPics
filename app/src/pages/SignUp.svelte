<script lang="ts">
	//@ts-nocheck

	import PasswordStrength from "$lib/components/PasswordStrength.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { user } from "$lib/stores/userStore";
	import { navigate } from "svelte-routing";
	import { writable } from "svelte/store";
	import { z } from "zod";
	import { account } from "../../appwrite";
	import { v4 as uuidv4 } from "uuid";
	import Loader from "$lib/components/Loader.svelte";

	// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
	const passwordValidation = new RegExp(
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
	);
	const schema = z.object({
		email: z.string().email("input a valid e-mail"),
		password: z.string().min(8).regex(passwordValidation),
	});

	function normalize(error) {
		const errors = { email: [], password: [] };

		error.forEach((err) => {
			errors[err.path[0]].push(err.message);
		});

		return errors;
	}

	async function signup() {
		try {
			schema.parse($credentials);
			console.log($credentials);
			$load = true;
			try {
				await account.create(
					uuidv4(),
					$credentials.email,
					$credentials.password,
				);
				navigate("/MedPics/Login");
			} catch (e) {
				$load = false;
				console.log(e.message);
				$errors.email = ["Email already in use"];
			}
		} catch (error) {
			$errors = normalize(JSON.parse(error.message));
		}
	}

	const load = writable(false);
	const errors = writable({});
	const credentials = writable({
		email: "",
		password: "",
	});

	$: $user.data !== undefined && navigate("/MedPics/");
</script>

{#if $load}
	<Loader />
{:else}
	<Card.Root
		class="absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 w-[90svw] md:w-2/6 md:min-w-[400px]"
	>
		<Card.Header>
			<Card.Title>Sign up</Card.Title>
			<Card.Description>
				Enter your credentials to create an account
			</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-5">
			<div class="flex flex-col space-y-1.5">
				<span class="flex gap-4">
					<Label for="email">Email</Label>
					<p
						class={`text-xs text-red-400 my-auto h-fit m-0 p-0 ${($errors?.email?.[0] && "visible") || "invisible size-0"}`}
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
				</span>
				<Input
					id="pass"
					type="password"
					placeholder="max123"
					value={$credentials.password}
					on:input={(e) => ($credentials.password = e.target?.value)}
				/>
				<PasswordStrength bind:password={$credentials.password} />
			</div>
			<div class="flex justify-between gap-5">
				<span class="flex h-fit gap-1 my-auto">
					<p class="text-xs mt-auto">Have an account?</p>

					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<p
						on:click={() => navigate("/MedPics/Login")}
						class="text-sm h-min font-semibold mt-auto cursor-pointer"
					>
						Log in
					</p>
				</span>

				<Button class="font-bold" variant="outline" on:click={signup}>
					Sign up
				</Button>
			</div>
		</Card.Content>
	</Card.Root>
{/if}

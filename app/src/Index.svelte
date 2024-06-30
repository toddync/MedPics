<script lang="ts">
	//@ts-nocheck
	import Router from "$lib/components/Router.svelte";
	import Search from "$lib/components/Search.svelte";
	import { Badge } from "$lib/components/ui/badge";
	import Button from "$lib/components/ui/button/button.svelte";
	import { modules } from "$lib/stores/modulesStore";
	import { quizzes } from "$lib/stores/quizzesStore";
	import { showSearch } from "$lib/stores/searchStore";
	import Url from "$lib/stores/urlStore";
	import { user } from "$lib/stores/userStore";
	import {
		Blocks,
		BookMarked,
		Command,
		Home,
		LogOut,
		NotebookPenIcon,
		Plus,
		SearchIcon,
		Trash2,
	} from "lucide-svelte";
	import { onMount } from "svelte";
	import { navigate } from "svelte-routing";
	import { tweened } from "svelte/motion";
	import {
		account,
		databases,
		db,
		modulesDB,
		professorsTeam,
		quizzesDB,
		teams,
	} from "../appwrite";

	const expand = tweened(48, { duration: 1000 });

	let p = $Url.searchParams;
	$: p = $Url.searchParams

	document.documentElement.classList.add("dark");

	async function login() {
		try {
			$user.data = (await account.getSession("current")) || {};

			getModules();
			getQuizzes();
			try {
				let r = await teams.get(professorsTeam);
				$user.professor = true;
			} catch (e) {}
		} catch (e) {
			!$Url.pathname.toLowerCase().includes("/login") &&
				!$Url.pathname.toLowerCase().includes("/signup") &&
				navigate("/index.html?page=Login");
		}

		return true;
	}
	onMount(login);

	async function getQuizzes() {
		$quizzes.queried = false;
		$quizzes.contents = await databases.listDocuments(db, quizzesDB);
		$quizzes.queried = true;
		return true;
	}

	async function deleteQuiz(id) {
		await databases.deleteDocument(db, quizzesDB, id);

		navigate("/index.html?page=Quizzes");
	}

	async function getModules() {
		$modules.queried = false;
		$modules.contents = await databases.listDocuments(db, modulesDB);
		$modules.queried = true;
		return true;
	}

	async function deleteModule(id) {
		await databases.deleteDocument(db, modulesDB, id);

		navigate("/index.html?page=/Home");
	}

	$: $Url.pathname &&
		$user.data !== undefined &&
		getModules() &&
		getQuizzes();
</script>

{#if !(p.get("page") == "Login") && !(p.get("page") == "Signup")}
	<Search />
	<div
		class="absolute w-full h-full grid flex-wrap grid-cols-1 auto-rows-max"
	>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="border-b-2 border-r-2 p-2 grid h-fit md:h-[100svh] md:pt-1 z-50 bg-background transition-all ease-linear group sticky md:fixed top-0"
			on:mouseenter={() => ($expand = 200)}
			on:mouseleave={() => ($expand = 48)}
			style={`width: ${$expand}`}
		>
			<div class="size-fit mx-auto mb-auto flex md:grid">
				<Button
					class="md:group-hover:mt-2 md:group-hover:w-full md:group-hover:p-2 transition-all duration-400 ease-linear flex md:mb-3 mx-auto"
					size="icon"
					variant="ghost"
					on:click={() => ($showSearch = true)}
				>
					<SearchIcon />
					<span
						class="w-[0px] md:group-hover:w-fit md:group-hover:ml-4 overflow-hidden transition-all duration-400 ease-linear text-muted-foreground flex gap-2 md:group-hover:mr-auto"
					>
						<p class="h-fit my-auto">Search...</p>
						<Badge
							variant="secondary"
							class="pt-0.5 group-hover:bg-red-900/60"
						>
							<Command class="w-3.5" /> + K
						</Badge>
					</span>
				</Button>

				<Button
					class="md:group-hover:mt-2 md:group-hover:w-full md:group-hover:p-2 transition-all duration-400 ease-linear flex md:mb-3 mx-auto"
					size="icon"
					variant="ghost"
					on:click={() => navigate("/index.html?page=Home")}
				>
					<Home />
					<span
						class="w-[0px] md:group-hover:w-fit md:group-hover:ml-4 overflow-hidden transition-all duration-400 ease-linear text-muted-foreground flex gap-1 md:group-hover:mr-auto"
					>
						<p class="h-fit">Home</p>
					</span>
				</Button>

				<Button
					class="md:group-hover:mt-2 md:group-hover:w-full md:group-hover:p-2 transition-all duration-400 ease-linear flex md:mb-3 mx-auto"
					size="icon"
					variant="ghost"
					on:click={() => navigate("/index.html?page=Quizzes")}
				>
					<BookMarked />
					<span
						class="w-[0px] md:group-hover:w-fit md:group-hover:ml-4 overflow-hidden transition-all duration-400 ease-linear text-muted-foreground flex gap-1 md:group-hover:mr-auto"
					>
						<p class="h-fit">Quizzes</p>
					</span>
				</Button>

				{#if $user.professor}
					<hr class="border-t-4 rounded-lg my-3" />
					<div
						class="md:hidden h-[3rem] bg-border min-w-[4px] rounded-lg mx-1"
					/>
					<Button
						class="md:group-hover:mt-2 md:group-hover:w-full md:group-hover:p-2 transition-all duration-400 ease-linear flex place-items-start mx-auto"
						size="icon"
						variant="ghost"
						on:click={() => navigate("/index.html?page=NewModule")}
					>
						<div class="relative h-fit my-auto">
							<Plus
								class="absolute translate-x-1/2 -translate-y-1/2 top-1.5 right-1.5 w-3 z-50"
							/>
							<div
								class="absolute bg-background top-[1px] right-0 size-3"
							/>

							<Blocks />
						</div>
						<span
							class="w-[0px] md:group-hover:w-fit md:group-hover:ml-4 overflow-hidden transition-all duration-400 ease-linear text-muted-foreground flex gap-1 md:group-hover:mr-auto"
						>
							<p class="h-fit my-auto">New Module</p>
						</span>
					</Button>

					<Button
						class="md:group-hover:mt-2 md:group-hover:w-full md:group-hover:p-2 transition-all duration-400 ease-linear flex place-items-start mx-auto"
						size="icon"
						variant="ghost"
						on:click={() => navigate("/index.html?page=NewQuiz")}
					>
						<div class="relative h-fit my-auto">
							<Plus
								class="absolute translate-x-1/2 -translate-y-1/2 top-1.5 right-0.5 w-3 z-50 bg-background h-2.5"
							/>

							<BookMarked />
						</div>
						<span
							class="w-[0px] md:group-hover:w-fit md:group-hover:ml-4 overflow-hidden transition-all duration-400 ease-linear text-muted-foreground flex gap-1 md:group-hover:mr-auto"
						>
							<p class="h-fit my-auto">New Quiz</p>
						</span>
					</Button>
				{/if}

				{#if p.get("page") == "Module" || p.get("page") == "EditModule"}
					<hr class="border-t-4 rounded-lg my-3" />
					<div
						class="md:hidden h-[3rem] bg-border min-w-[4px] rounded-lg mx-1"
					/>
					<Button
						class="md:group-hover:mt-2 md:group-hover:w-full md:group-hover:p-2 transition-all duration-400 ease-linear flex place-items-start mx-auto"
						size="icon"
						variant="ghost"
						on:click={() =>
							navigate(`/index.html?page=EditModule&id=${$modules.current.$id}`)}
					>
						<NotebookPenIcon />
						<span
							class="w-[0px] md:group-hover:w-fit md:group-hover:ml-4 overflow-hidden transition-all duration-400 ease-linear text-muted-foreground flex gap-1 md:group-hover:mr-auto"
						>
							<p class="h-fit my-auto">Edit Module</p>
						</span>
					</Button>

					<Button
						class="md:group-hover:mt-2 md:group-hover:w-full md:group-hover:p-2 transition-all duration-400 ease-linear flex place-items-start mx-auto"
						size="icon"
						variant="ghost"
						on:click={() => deleteModule($modules.current.$id)}
					>
						<Trash2 class="text-red-900" />
						<span
							class="w-[0px] md:group-hover:w-fit md:group-hover:ml-4 overflow-hidden transition-all duration-400 ease-linear text-muted-foreground flex gap-1 md:group-hover:mr-auto"
						>
							<p class="h-fit my-auto">Delete Module</p>
						</span>
					</Button>
				{/if}

				{#if p.get("page") == "Quiz" || p.get("page") == "EditQuiz"}
					<hr class="border-t-4 rounded-lg my-3" />
					<div
						class="md:hidden h-[3rem] bg-border min-w-[4px] rounded-lg mx-1"
					/>
					<Button
						class="md:group-hover:mt-2 md:group-hover:w-full md:group-hover:p-2 transition-all duration-400 ease-linear flex place-items-start mx-auto"
						size="icon"
						variant="ghost"
						on:click={() =>
							navigate(`/index.html?page=EditQuiz&id=${$quizzes.current.$id}`)}
					>
						<NotebookPenIcon />
						<span
							class="w-[0px] md:group-hover:w-fit md:group-hover:ml-4 overflow-hidden transition-all duration-400 ease-linear text-muted-foreground flex gap-1 md:group-hover:mr-auto"
						>
							<p class="h-fit my-auto">Edit Quiz</p>
						</span>
					</Button>

					<Button
						class="md:group-hover:mt-2 md:group-hover:w-full md:group-hover:p-2 transition-all duration-400 ease-linear flex place-items-start mx-auto"
						size="icon"
						variant="ghost"
						on:click={() => deleteQuiz($quizzes.current.$id)}
					>
						<Trash2 class="text-red-900" />
						<span
							class="w-[0px] md:group-hover:w-fit md:group-hover:ml-4 overflow-hidden transition-all duration-400 ease-linear text-muted-foreground flex gap-1 md:group-hover:mr-auto"
						>
							<p class="h-fit my-auto">Delete Quiz</p>
						</span>
					</Button>
				{/if}
			</div>
		</div>

		<div class="w-full h-full p-7 pl-0 mb-auto md:pl-[3rem]">
			<Router {$Url} />
		</div>
	</div>
{:else}
	<Router {$Url} />
{/if}

<script lang="ts">
	//@ts-nocheck
	import { Route, Router } from "svelte-routing";
	import EditModule from "../../pages/EditModule.svelte";
	import EditQuiz from "../../pages/EditQuiz.svelte";
	import Home from "../../pages/Home.svelte";
	import Login from "../../pages/LogIn.svelte";
	import Module from "../../pages/Module.svelte";
	import NewModule from "../../pages/NewModule.svelte";
	import NewQuiz from "../../pages/NewQuiz.svelte";
	import Quiz from "../../pages/Quiz.svelte";
	import QuizResults from "../../pages/QuizResults.svelte";
	import Quizzes from "../../pages/Quizzes.svelte";
	import Signup from "../../pages/SignUp.svelte";
	import Url from "$lib/stores/urlStore"
	
	let p = $Url.searchParams;
	$: p = $Url.searchParams
</script>

<!--* Auth *-->
{#if p.get("page") == "Login"}
	<Login />
{:else if p.get("page") == "Signup"}
	<Signup />

<!--* Modules *-->
{:else if p.get("page") == "Home"}
	<Home />
{:else if p.get("page") == "NewModule"}
	<NewModule />
{:else if p.get("page") == "EditModule"}
	<EditModule id={p.get("id")} />
{:else if p.get("page") == "Module"}
	<Module id={p.get("id")} />

<!--* Quizzes *-->
{:else if p.get("page") == "Quizzes"}
	<Quizzes />
{:else if p.get("page") == "NewQuiz"}
	<NewQuiz />
{:else if p.get("page") == "QuizResults"}
	<QuizResults id={p.get("id")} responses={JSON.parse(p.get("responses"))} />
{:else if p.get("page") == "EditQuiz"}
	<EditQuiz id={p.get("id")} />
{:else if p.get("page") == "Quiz"}
	<Quiz id={p.get("id")} />
{/if}


<!-- <Router >
	<Route path="/Login" component={Login} />
	<Route path="/Signup" component={Signup} />
	
	<Route path="/" component={Home} />
	<Route path="/NewModule" component={NewModule} />
	<Route path="/Module/:id" let:params>
		<Module id={params.id} />
	</Route>
	<Route path="/EditModule/:id" let:params>
		<EditModule id={params.id} />
	</Route>

	
	<Route path="/Quizzes" component={Quizzes} />
	<Route path="/NewQuiz" component={NewQuiz} />
	<Route path="/Quiz/:id" let:params>
		<Quiz id={params.id} />
	</Route>
	<Route path="/QuizResults/:id/:responses" let:params>
		<QuizResults id={params.id} responses={JSON.parse(params.responses)} />
	</Route>
	<Route path="/EditQuiz/:id" let:params>
		<EditQuiz id={params.id} />
	</Route>
</Router> -->

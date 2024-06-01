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
	export let url = "";
</script>

<Router {url}>
	<!--* Auth *-->
	<Route path="/Login" component={Login} />
	<Route path="/Signup" component={Signup} />

	<!--* Modules *-->
	<Route path="/" component={Home} />
	<Route path="/NewModule" component={NewModule} />
	<Route path="/Module/:id" let:params>
		<Module id={params.id} />
	</Route>
	<Route path="/EditModule/:id" let:params>
		<EditModule id={params.id} />
	</Route>

	<!--* Quizzes *-->
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
</Router>

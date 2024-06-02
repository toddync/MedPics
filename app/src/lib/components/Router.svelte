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
	<Route path="/MedPics/Login" component={Login} />
	<Route path="/MedPics/Signup" component={Signup} />

	<!--* Modules *-->
	<Route path="/MedPics/" component={Home} />
	<Route path="/MedPics/NewModule" component={NewModule} />
	<Route path="/MedPics/Module/:id" let:params>
		<Module id={params.id} />
	</Route>
	<Route path="/MedPics/EditModule/:id" let:params>
		<EditModule id={params.id} />
	</Route>

	<!--* Quizzes *-->
	<Route path="/MedPics/Quizzes" component={Quizzes} />
	<Route path="/MedPics/NewQuiz" component={NewQuiz} />
	<Route path="/MedPics/Quiz/:id" let:params>
		<Quiz id={params.id} />
	</Route>
	<Route path="/MedPics/QuizResults/:id/:responses" let:params>
		<QuizResults id={params.id} responses={JSON.parse(params.responses)} />
	</Route>
	<Route path="/MedPics/EditQuiz/:id" let:params>
		<EditQuiz id={params.id} />
	</Route>
</Router>

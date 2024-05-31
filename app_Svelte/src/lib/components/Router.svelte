<script lang="ts">
	//@ts-nocheck
	import { Router, Route } from "svelte-routing";
	import Login from "../../pages/LogIn.svelte";
	import Signup from "../../pages/SignUp.svelte";
	import Module from "../../pages/Module.svelte";
	import NewModule from "../../pages/NewModule.svelte";
	import Home from "../../pages/Home.svelte";
	import EditModule from "../../pages/EditModule.svelte";
	export let url = "";
</script>

<Router {url}>
	<Route path="/" component={Home} />
	<Route path="/Login" component={Login} />
	<Route path="/Signup" component={Signup} />

	<Route path="/Module/:id" let:params>
		<Module id={params.id} />
	</Route>
	<Route path="/NewModule" component={NewModule} />

	<Route path="/EditModule/:id" let:params>
		<EditModule id={params.id} />
	</Route>
</Router>

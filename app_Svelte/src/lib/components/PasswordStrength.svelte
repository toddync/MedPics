<script>
	//@ts-nocheck
	export let password;
	import checkPasswordStrength from "check-password-strength";
	import * as Card from "./ui/card";

	$: strength = checkPasswordStrength.passwordStrength(password);
	$: console.log(strength);

	const validClass = "text-lime-400/40 line-through";
	const invalidClass = "text-red-400/40";
</script>

<div id="color-indicators" class="grid grid-cols-4 gap-1 pt-1 *:h-[2px]">
	<span class={strength.id >= 0 && "bg-red-600 rounded-lg"}></span>
	<span class={strength.id >= 1 && "bg-orange-600 rounded-lg"}></span>
	<span class={strength.id >= 2 && "bg-yellow-600 rounded-lg"}></span>
	<span class={strength.id >= 3 && "bg-lime-600 rounded-lg"}></span>
</div>

<ul class="list-disc p-0 pl-10 text-xs">
	<li class={(strength.length >= 8 && validClass) || invalidClass}>
		8 characters or more
	</li>

	<li
		class={(strength.contains.includes("lowercase") && validClass) ||
			invalidClass}
	>
		Lowercase
	</li>

	<li
		class={(strength.contains.includes("uppercase") && validClass) ||
			invalidClass}
	>
		Uppercase
	</li>

	<li
		class={(strength.contains.includes("number") && validClass) ||
			invalidClass}
	>
		Number
	</li>

	<li
		class={(strength.contains.includes("symbol") && validClass) ||
			invalidClass}
	>
		Symbol
	</li>
</ul>

<!-- <style>
	#color-indicators {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: 0.2rem;
	}
</style> -->

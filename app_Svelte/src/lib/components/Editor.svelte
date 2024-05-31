<script lang="ts">
	//@ts-nocheck
	import { Color } from "@tiptap/extension-color";
	import ListItem from "@tiptap/extension-list-item";
	import TextStyle from "@tiptap/extension-text-style";
	import TextAlign from "@tiptap/extension-text-align";
	import CharacterCount from "@tiptap/extension-character-count";
	import { onMount, onDestroy } from "svelte";
	import { Editor } from "@tiptap/core";
	import StarterKit from "@tiptap/starter-kit";
	import {
		AlignCenter,
		AlignJustify,
		AlignLeft,
		AlignRight,
		Bold,
		Heading1,
		Heading2,
		Heading3,
		Heading,
		Italic,
		List,
		ListOrdered,
		ListTodo,
		Quote,
		Strikethrough,
	} from "lucide-svelte";
	import { Button } from "./ui/button";
	import * as DropdownMenu from "./ui/dropdown-menu";

	let element;
	let editor;
	export let content = "";
	export let change = () => {};

	const extensions = [
		Color.configure({ types: [TextStyle.name, ListItem.name] }),
		TextStyle.configure({ types: [ListItem.name] }),
		TextAlign.configure({
			defaultAlignment: "left",
			types: ["heading", "paragraph"],
			alignments: ["left", "center", "right", "justify"],
		}),
		CharacterCount.configure({
			limit: 10000,
		}),
		StarterKit.configure({
			bulletList: {
				keepMarks: true,
			},
			orderedList: {
				keepMarks: true,
			},
			heading: {
				levels: [1, 2, 3],
			},
		}),
	];

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: extensions,
			editorProps: {
				attributes: { class: "focus:outline-none" },
			},
			content: content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate() {
				change(editor.getHTML());
			},
			onSelectionUpdate() {
				const { selection } = editor.state;

				const viewportCoords = editor.view.coordsAtPos(selection.from);
				const absoluteOffset = window.scrollY + viewportCoords.top;

				window.scrollTo(
					window.scrollX,
					absoluteOffset - window.innerHeight / 2,
				);
			},
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div
	class="border rounded-xl p-[5px] pt-5 md:p-5 min-w-full max-w-[95vw] mx-auto h-full"
>
	{#if editor}
		<div
			class="grid grid-cols-6 md:grid-cols-[13] gap-[3px] sticky top-0 w-full left-0 z-10 mb-5 md:mb-10 bg-background pb-2 pt-6 -mt-4 border-b border-accent-500"
		>
			<Button
				class={editor.isActive("bold") && "bg-accent"}
				variant="outline"
				on:click={() => editor.chain().focus().toggleBold().run()}
			>
				<Bold />
			</Button>
			<Button
				class={editor.isActive("italic") && "bg-accent"}
				variant="outline"
				on:click={() => editor.chain().focus().toggleItalic().run()}
			>
				<Italic />
			</Button>
			<Button
				class={editor.isActive("strike") && "bg-accent"}
				variant="outline"
				on:click={() => editor.chain().focus().toggleStrike().run()}
			>
				<Strikethrough />
			</Button>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button
						variant="outline"
						class={"w-full " +
							((editor.isActive("heading", { level: 1 }) ||
								editor.isActive("heading", { level: 2 }) ||
								editor.isActive("heading", { level: 3 })) &&
								"bg-accent")}
					>
						<Heading />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class=" flex gap-2">
					<DropdownMenu.Item
						class={"flex place-content-center " +
							(editor.isActive("heading", { level: 1 }) &&
								" bg-accent")}
						on:click={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 1 })
								.run()}
					>
						<Heading1 />
					</DropdownMenu.Item>
					<DropdownMenu.Item
						class={"flex place-content-center " +
							(editor.isActive("heading", { level: 2 }) &&
								" bg-accent")}
						on:click={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 2 })
								.run()}
					>
						<Heading2 />
					</DropdownMenu.Item>
					<DropdownMenu.Item
						class={"flex place-content-center " +
							(editor.isActive("heading", { level: 3 }) &&
								" bg-accent")}
						on:click={() =>
							editor
								.chain()
								.focus()
								.toggleHeading({ level: 3 })
								.run()}
					>
						<Heading3 />
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>

			<div class="md:hidden w-full">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="w-full">
						<Button
							variant="outline"
							class={"w-full " +
								((editor.isActive("bulletList") ||
									editor.isActive("orderedList")) &&
									"bg-accent")}
						>
							<ListTodo />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="grid grid-cols-2 gap-2">
						<DropdownMenu.Item
							class={"flex place-content-center " +
								(editor.isActive("bulletList") && " bg-accent")}
							on:click={() =>
								editor.chain().focus().toggleBulletList().run()}
						>
							<List />
						</DropdownMenu.Item>
						<DropdownMenu.Item
							class={"flex place-content-center " +
								(editor.isActive("orderedList") &&
									" bg-accent")}
							on:click={() =>
								editor
									.chain()
									.focus()
									.toggleOrderedList()
									.run()}
						>
							<ListOrdered />
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>

			<Button
				class={"hidden md:flex " +
					(editor.isActive("bulletList") && "bg-accent")}
				variant="outline"
				on:click={() => editor.chain().focus().toggleBulletList().run()}
			>
				<List />
			</Button>
			<Button
				class={"hidden md:flex " +
					(editor.isActive("orderedList") && "bg-accent")}
				variant="outline"
				on:click={() =>
					editor.chain().focus().toggleOrderedList().run()}
			>
				<ListOrdered />
			</Button>
			<Button
				class={editor.isActive("blockquote") && "bg-accent"}
				variant="outline"
				on:click={() => editor.chain().focus().toggleBlockquote().run()}
			>
				<Quote />
			</Button>
			<Button
				class={editor.isActive({ textAlign: "justify" }) && "bg-accent"}
				variant="outline"
				on:click={() => editor.commands.setTextAlign("justify")}
			>
				<AlignJustify />
			</Button>
			<Button
				class={editor.isActive({ textAlign: "left" }) && "bg-accent"}
				variant="outline"
				on:click={() => editor.commands.setTextAlign("left")}
			>
				<AlignLeft />
			</Button>
			<Button
				class={editor.isActive({ textAlign: "center" }) && "bg-accent"}
				variant="outline"
				on:click={() => editor.commands.setTextAlign("center")}
			>
				<AlignCenter />
			</Button>
			<Button
				class={editor.isActive({ textAlign: "right" }) && "bg-accent"}
				variant="outline"
				on:click={() => editor.commands.setTextAlign("right")}
			>
				<AlignRight />
			</Button>
			<Button
				variant="outline"
				class="text-xs md:text-sm col-span-2 lg:col-span-1 text-center"
			>
				{editor.getText().length}/10000
			</Button>
		</div>
	{/if}

	<div
		bind:this={element}
		class="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-10 min-w-full"
	/>
</div>

import React, { useCallback, useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import {
    AlignCenterIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    HeadingIcon,
    ItalicIcon,
    ListIcon,
    ListOrderedIcon,
    ListTodoIcon,
    QuoteIcon,
    StrikethroughIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ColorPicker from "./ColorPicker.jsx";
import { uploadDirect } from "@uploadcare/upload-client";

function uploadImage(file) {
    const data = new FormData();
    data.append("file", file);
    return uploadDirect(file, {
        publicKey: "bdb80b1ea3a4ae6b53f0",
        store: "1",
    });
}

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    ImageResize,
    TextAlign.configure({
        defaultAlignment: "left",
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
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

const MenuBar = ({ editor }) => {
    const [color, setColor] = useState("");

    const changeColor = useCallback(
        (c) => {
            setColor(c);
            editor.chain().focus().setColor(c).run();
        },
        [editor]
    );

    if (!editor) {
        return null;
    }

    return (
        <div className="grid grid-cols-6 md:grid-cols-12  gap-[3px] sticky top-16 w-full left-0 z-10 mb-5 md:mb-10 bg-background pb-2 pt-2 -mt-4 border-b border-accent-500">
            <Button
                className={editor.isActive("bold") && "bg-accent"}
                variant="outline"
                onClick={() => editor.chain().focus().toggleBold().run()}>
                <BoldIcon />
            </Button>
            <Button
                className={editor.isActive("italic") && "bg-accent"}
                variant="outline"
                onClick={() => editor.chain().focus().toggleItalic().run()}>
                <ItalicIcon />
            </Button>
            <Button
                className={editor.isActive("strike") && "bg-accent"}
                variant="outline"
                onClick={() => editor.chain().focus().toggleStrike().run()}>
                <StrikethroughIcon />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className={
                            (editor.isActive("heading", { level: 1 }) ||
                                editor.isActive("heading", { level: 2 }) ||
                                editor.isActive("heading", { level: 3 })) &&
                            "bg-accent"
                        }>
                        <HeadingIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" flex gap-2">
                    <DropdownMenuItem
                        className={
                            "flex place-content-center " +
                            (editor.isActive("heading", { level: 1 }) &&
                                " bg-accent")
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 1 })
                                .run()
                        }>
                        <Heading1Icon />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className={
                            "flex place-content-center " +
                            (editor.isActive("heading", { level: 2 }) &&
                                " bg-accent")
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 2 })
                                .run()
                        }>
                        <Heading2Icon />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className={
                            "flex place-content-center " +
                            (editor.isActive("heading", { level: 3 }) &&
                                " bg-accent")
                        }
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 3 })
                                .run()
                        }>
                        <Heading3Icon />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className={
                            "flex lg:hidden " +
                            ((editor.isActive("bulletList") ||
                                editor.isActive("orderedList")) &&
                                "bg-accent")
                        }>
                        <ListTodoIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="grid grid-cols-2 gap-2">
                    <DropdownMenuItem
                        className={
                            "flex place-content-center " +
                            (editor.isActive("bulletList") && " bg-accent")
                        }
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }>
                        <ListIcon />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className={
                            "flex place-content-center " +
                            (editor.isActive("orderedList") && " bg-accent")
                        }
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }>
                        <ListOrderedIcon />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button
                className={
                    "hidden lg:flex " +
                    (editor.isActive("bulletList") && "bg-accent")
                }
                variant="outline"
                onClick={() => editor.chain().focus().toggleBulletList().run()}>
                <ListIcon />
            </Button>
            <Button
                className={
                    "hidden lg:flex " +
                    (editor.isActive("orderedList") && "bg-accent")
                }
                variant="outline"
                onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }>
                <ListOrderedIcon />
            </Button>
            <Button
                className={editor.isActive("blockquote") && "bg-accent"}
                variant="outline"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                <QuoteIcon />
            </Button>
            {/* <Button
                className={
                    editor.isActive({ textAlign: "justify" }) && "bg-accent"
                }
                variant="outline"
                onClick={() => editor.commands.setTextAlign("justify")}>
                <AlignJustifyIcon />
            </Button> */}
            <Button
                className={
                    editor.isActive({ textAlign: "left" }) && "bg-accent"
                }
                variant="outline"
                onClick={() => editor.commands.setTextAlign("left")}>
                <AlignLeftIcon />
            </Button>
            <Button
                className={
                    editor.isActive({ textAlign: "center" }) && "bg-accent"
                }
                variant="outline"
                onClick={() => editor.commands.setTextAlign("center")}>
                <AlignCenterIcon />
            </Button>
            <Button
                className={
                    editor.isActive({ textAlign: "right" }) && "bg-accent"
                }
                variant="outline"
                onClick={() => editor.commands.setTextAlign("right")}>
                <AlignRightIcon />
            </Button>
            <ColorPicker
                color={color}
                setColor={changeColor}
                className={
                    editor.isActive("textStyle") &&
                    !editor.isActive("textStyle", { color: "" }) &&
                    "bg-accent"
                }
            />
            <Button
                variant="outline"
                className="text-xs md:text-sm col-span-2 lg:col-span-1">
                {editor.getText().length}/10000
            </Button>
        </div>
    );
};

function Editor({ content, setContent, name, className, containerClassName }) {
    const editor = useEditor({
        extensions,
        content: content,
        editorProps: {
            attributes: {
                class:
                    "prose max-w-full dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl  focus:outline-none min-h-10 " +
                    className,
            },
            handleDrop: function (view, event, slice, moved) {
                if (
                    !moved &&
                    event.dataTransfer &&
                    event.dataTransfer.files &&
                    event.dataTransfer.files[0]
                ) {
                    // if dropping external files
                    let file = event.dataTransfer.files[0]; // the dropped file
                    let filesize = (file.size / 1024 / 1024).toFixed(4); // get the filesize in MB
                    if (
                        (file.type === "image/jpeg" ||
                            file.type === "image/png") &&
                        filesize < 10
                    ) {
                        // check valid image type under 10MB
                        // check the dimensions
                        let _URL = window.URL || window.webkitURL;
                        let img = new Image();
                        img.src = _URL.createObjectURL(file);
                        img.onload = function () {
                            if (this.width > 5000 || this.height > 5000) {
                                window.alert(
                                    "Your images need to be less than 5000 pixels in height and width."
                                ); // display alert
                            } else {
                                // valid image so upload to server
                                // uploadImage will be your function to upload the image to the server or s3 bucket somewhere
                                uploadImage(file)
                                    .then(function (response) {
                                        // response is the image url for where it has been saved
                                        // pre-load the image before responding so loading indicators can stay
                                        // and swaps out smoothly when image is ready
                                        console.log(response.cdnUrl);
                                        let image = new Image();
                                        image.src = response.cdnUrl;
                                        image.onload = function () {
                                            // place the now uploaded image in the editor where it was dropped
                                            const { schema } = view.state;
                                            const coordinates =
                                                view.posAtCoords({
                                                    left: event.clientX,
                                                    top: event.clientY,
                                                });
                                            const node =
                                                schema.nodes.image.create({
                                                    src: response.cdnUrl,
                                                }); // creates the image element
                                            const transaction =
                                                view.state.tr.insert(
                                                    coordinates.pos,
                                                    node
                                                ); // places it in the correct position
                                            return view.dispatch(transaction);
                                        };
                                    })
                                    .catch(function (error) {
                                        if (error) {
                                            window.alert(
                                                "There was a problem uploading your image, please try again."
                                            );
                                        }
                                    });
                            }
                        };
                    } else {
                        window.alert(
                            "Images need to be in jpg or png format and less than 10mb in size."
                        );
                    }
                    return true; // handled
                }
                return false; // not handled use default behavior
            },
        },
        onUpdate() {
            setContent({
                target: {
                    name: name,
                    value: editor.getHTML(),
                    size: editor.getText().length,
                },
            });
        },
        onSelectionUpdate() {
            const { selection } = editor.state;

            //? Do not scroll into view when we're doing a mass update (e.g. underlining text)
            //? We only want the scrolling to happen during actual user input
            //! if (!selection.empty) { return }

            const viewportCoords = editor.view.coordsAtPos(selection.from);
            const absoluteOffset = window.scrollY + viewportCoords.top;

            window.scrollTo(
                window.scrollX,
                absoluteOffset - window.innerHeight / 2
            );
        },
    });

    useEffect(() => {
        editor && editor.getText() == "" && editor.commands.setContent(content);
    }, [editor, content]);

    return (
        <div
            className={
                "border rounded-xl p-[5px] pt-5 md:p-5 min-w-full max-w-[95vw] mx-auto h-full " +
                containerClassName
            }>
            <MenuBar editor={editor} />
            <div className="z-0">
                <EditorContent editor={editor}></EditorContent>
            </div>
        </div>
    );
}

export default Editor;

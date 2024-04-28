import { PaintBucketIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function ColorPicker({ setColor, className }) {
    return (
        <GradientPicker
            setColor={setColor}
            className={className}
        />
    );
}

export function GradientPicker({ setColor, className }) {
    const solids = [
        "#ff75c3",
        "#ffa647",
        "#ffe83f",
        "#9fff5b",
        "#70e2ff",
        "#cd93ff",
        "#09203f",
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"outline"}
                    className={className}>
                    <PaintBucketIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-min ml-5">
                <div
                    value="solid"
                    className=" grid grid-cols-4 gap-2">
                    <span
                        className="size-6 cursor-pointer"
                        onClick={() => setColor("")}>
                        <TrashIcon className="size-6" />
                    </span>
                    {solids.map((s) => (
                        <span
                            key={s}
                            style={{ background: s }}
                            className="size-6 cursor-pointer rounded-md hover:scale-105"
                            onClick={() => setColor(s)}
                        />
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

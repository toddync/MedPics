import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
} from "./ui/dialog";
import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import pb from "../pb";
import { useNavigate } from "react-router-dom";

const DeleteButton = ({ collection, id, goTo }) => {
    const navigate = useNavigate();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="select-none hover:border-red-500/20 items-center rounded-xl px-2 py-1.5 text-sm transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-10 h-10 xs:ml-1 border hover:bg-red-500/5 cursor-pointer">
                    <Trash2Icon className="text-red-500" />
                    <p className="sr-only">Delete button</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are tou sure?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    this is not reversible, you'll need to redo the whole
                    content
                </DialogDescription>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={async () => {
                            await pb.collection(collection).delete(id);
                            goTo && navigate(goTo);
                        }}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteButton;

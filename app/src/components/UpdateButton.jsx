import { EditIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const UpdateButton = ({ goTo }) => {
    const navigate = useNavigate();
    return (
        <Button
            variant="outline"
            className="select-none items-center rounded-xl px-2 py-1.5 text-sm transition-colors focus:text-accent-foreground hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-10 h-10 xs:ml-1 border hover:bg-accent cursor-pointer"
            onClick={() => navigate(goTo)}>
            <EditIcon />
        </Button>
    );
};

export default UpdateButton;

import { BriefcaseMedical } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

function MobileSheet({ children, logoToHome }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden">
                    <BriefcaseMedical className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                    <a
                        href={logoToHome ? "/" : "#"}
                        className="flex items-center gap-2 text-lg font-semibold">
                        <BriefcaseMedical className="h-6 w-6" />
                    </a>

                    {children}
                </nav>
            </SheetContent>
        </Sheet>
    );
}

export default MobileSheet;

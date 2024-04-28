import { BriefcaseMedicalIcon, PlusIcon, Search } from "lucide-react";
import { Input } from "./ui/input";
import MobileSheet from "./MobileSheet";
import pb from "../pb";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function Header({
    action,
    children,
    add,
    search,
    searchValue,
    changeSearchValue,
    logoToHome,
}) {
    const navigate = useNavigate();
    return (
        <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 min-w-[100vw]">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <span
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    tabIndex={0}>
                    <BriefcaseMedicalIcon
                        className="h-7 w-7 cursor-pointer"
                        onClick={() => logoToHome && navigate("/")}
                    />
                </span>
                {children}
            </nav>
            <MobileSheet logoToHome={logoToHome}>{children}</MobileSheet>
            <div className="flex w-full md:w-fit items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 relative">
                {search && (
                    <form className={`mx-auto flex-1 sm:flex-initial`}>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={searchValue}
                                onChange={changeSearchValue}
                                type="search"
                                placeholder="Search products..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                )}
            </div>
            <div className="flex gap-2">
                {add && pb.authStore.model.professor && (
                    <Button
                        onClick={() => navigate(add)}
                        variant="outline"
                        className="select-none items-center rounded-xl px-2 py-1.5 text-sm transition-colors focus:text-accent-foreground hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-10 h-10 xs:ml-1 border hover:bg-accent cursor-pointer">
                        <PlusIcon />
                    </Button>
                )}
                {action ? action : null}
            </div>
        </header>
    );
}

export function Page({ link, text }) {
    return (
        <a
            href={link}
            className="text-foreground hover:scale-110 transition hover:underline hover:font-bold cursor-pointer min-w-fit">
            {text}
        </a>
    );
}

export default Header;

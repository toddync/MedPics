import { useEffect, useState } from "react";
import ModuleCard from "../components/ContentCard";
import Header, { Page } from "../components/Header";
import pb from "../pb";
import { ActivityIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Quizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const r = await pb.collection("quizzes").getList(1, 50, {
                filter: `title ~ "${search}"`,
            });
            setQuizzes(r.items);
        })();
    }, [search]);

    return (
        <div className="flex min-h-screen flex-col">
            <Header
                logoToHome
                add="/NewQuiz"
                search
                searchValue={search}
                changeSearchValue={(e) => setSearch(e.target.value)}>
                <Page
                    text="Modules"
                    link="/"
                />
                <Page text="Quizzes" />
                {pb.authStore.model.professor && (
                    <>
                        <Page
                            text="New module"
                            link="/NewModule"
                        />
                        <Page
                            text="New quiz"
                            link="/NewQuiz"
                        />
                    </>
                )}
            </Header>
            <main className="flex flex-1 flex-col gap-4 p-4 sm:gap-8 sm:p-8">
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {quizzes.map((q) => (
                        <ModuleCard
                            content={q}
                            key={q.id}
                            click={() => navigate(`/Quizzes/${q.id}`)}
                            icon={
                                <ActivityIcon className="h-5 w-5 text-muted-foreground group-hover:text-lime-400 group-focus:text-lime-400 transition" />
                            }
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
export default Quizzes;

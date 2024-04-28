import pb from "../pb";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header, { Page } from "../components/Header";
import DeleteButton from "../components/DeleteButton";
import UpdateButton from "../components/UpdateButton";

const Module = () => {
    const id = useParams().id;
    const [page, setPage] = useState({
        content: "",
    });

    useEffect(() => {
        (async () => {
            setPage(await pb.collection("modules").getOne(id));
        })();
    }, [id]);

    return (
        <div className="min-h-screen">
            <Header
                logoToHome
                add="/NewModule"
                action={
                    pb.authStore.model.id == page.creator && (
                        <>
                            <UpdateButton goTo={`/editModule/${id}`} />
                            <DeleteButton
                                id={id}
                                collection="modules"
                                goTo="/"
                            />
                        </>
                    )
                }>
                <Page
                    text="Modules"
                    link="/"
                />
                <Page
                    text="Quizzes"
                    link="/Quizzes"
                />
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
            <main className="min-w-full flex flex-1 flex-col gap-4 p-4 sm:gap-8 sm:p-8 prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl">
                {parse(page.content)}
            </main>
        </div>
    );
};

export default Module;

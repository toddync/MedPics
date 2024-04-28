import pb from "../pb";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { HoverBorderGradient } from "../components/HoverBorder";
import Header, { Page } from "../components/Header";
import DeleteButton from "../components/DeleteButton";
import UpdateButton from "../components/UpdateButton";
import Question from "../components/Question";

function Quiz() {
    console.log(useParams());
    const params = useParams();
    const id = params.id ? params.id : params.responses;
    const [responses, setResponses] = useState(
        JSON.parse(params.id ? params.responses : "[]")
    );
    const [quiz, setQuiz] = useState({
        title: "",
        questions: [],
    });
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            let q = await pb.collection("quizzes").getOne(id);
            setQuiz(q);
            responses.length == 0 &&
                setResponses(Array.apply(undefined, Array(q.questions.length)));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <Header
                add="/NewQuiz"
                logoToHome
                action={
                    pb.authStore.model.id == quiz.creator && (
                        <>
                            <UpdateButton goTo={`/EditQuiz/${id}`} />
                            <DeleteButton
                                id={id}
                                collection="quizzes"
                                goTo="/Quizzes"
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
            <main className="min-w-[100vw] gap-4 p-4 sm:gap-8 sm:p-8 prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl">
                <h1 className="mx-auto w-fit">{quiz.title}</h1>
                <div className="min-w-screen grid gap-5">
                    {quiz.questions.map((q, i) => (
                        <Question
                            key={`question-${i}`}
                            index={i}
                            question={q}
                            set={setResponses}
                            response={responses[i]}
                        />
                    ))}
                </div>
                <HoverBorderGradient containerClassName="w-fit mx-auto mt-10">
                    <Button
                        variant="outline"
                        className="text-lg font-bold"
                        onClick={() =>
                            navigate(
                                `/QuizResults/${id}/${JSON.stringify(
                                    responses
                                )}`
                            )
                        }>
                        See results
                    </Button>
                </HoverBorderGradient>
            </main>
        </div>
    );
}
export default Quiz;

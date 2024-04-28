import { useCallback, useEffect, useState } from "react";
import Header, { Page } from "../components/Header";
import pb from "../pb";
import QuestionBuilder from "../components/QuestionBuilder";
import { Button } from "../components/ui/button";
import { PlusIcon } from "lucide-react";
import { HoverBorderGradient } from "../components/HoverBorder";
import { Toaster } from "../components/ui/toaster";
import { useToast } from "../components/ui/use-toast";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useNavigate, useParams } from "react-router-dom";

function EditQuiz() {
    const id = useParams().id;
    const [quiz, setQuiz] = useState({
        title: "",
        questions: [],
    });
    const { toast } = useToast();
    const navigate = useNavigate();

    const update = useCallback(() => {
        if (
            quiz.questions.length == 0 ||
            (quiz.questions[0] && quiz.questions[0].answers.length == 0) ||
            (quiz.questions[0] && quiz.questions[0].correct === "")
        ) {
            toast({
                title: "Error",
                description:
                    "create 1 question with 1 or more answers and 1 correct answer first",
            });
            return;
        }

        (async () => {
            await pb.collection("quizzes").update(id, quiz);

            navigate("/Quizzes");
        })();
    }, [id, navigate, quiz, toast]);

    useEffect(() => {
        (async () => {
            setQuiz(await pb.collection("quizzes").getOne(id));
        })();
    }, [id]);

    return (
        <div className="flex min-h-screen flex-col">
            <Header
                logoToHome
                action={
                    <HoverBorderGradient containerClassName="mt-5 w-fit mx-auto absolute right-2 -top-2">
                        <Button
                            variant="outline"
                            className="text-lg"
                            onClick={update}>
                            Update quiz
                        </Button>
                    </HoverBorderGradient>
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
            <main className="flex flex-1 flex-col gap-4 p-4 sm:gap-8 sm:p-8">
                <Card className="w-full lg:w-[60%] mx-auto">
                    <CardHeader>
                        <CardTitle>Title:</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            className="text-lg font-bold"
                            value={quiz.title}
                            onChange={(e) =>
                                setQuiz((s) => ({
                                    ...s,
                                    title: e.target.value,
                                }))
                            }
                        />
                    </CardContent>
                </Card>

                <div className="grid gap-3">
                    {quiz.questions.map((q, i) => (
                        <QuestionBuilder
                            key={i}
                            question={q}
                            index={i}
                            set={setQuiz}
                        />
                    ))}
                    <Button
                        variant="outline"
                        className="select-none items-center rounded-xl px-2 py-1.5 text-sm transition-colors focus:text-accent-foreground hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 xs:ml-1 border hover:bg-accent cursor-pointer mx-auto mt-5 size-10"
                        onClick={() =>
                            setQuiz((s) => ({
                                title: s.title,
                                questions: [
                                    ...s.questions,
                                    { text: "", answers: [], correct: "" },
                                ],
                            }))
                        }>
                        <PlusIcon />
                    </Button>
                </div>
            </main>
            <Toaster />
        </div>
    );
}
export default EditQuiz;

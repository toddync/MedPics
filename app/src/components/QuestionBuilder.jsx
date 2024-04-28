import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const QuestionBuilder = ({ question, set, index }) => {
    return (
        <Card className="w-full lg:w-[60%] mx-auto">
            <CardHeader>
                <Button
                    variant="outline"
                    className="select-none items-center rounded-xl px-2 py-1.5 text-sm transition-colors focus:text-red-600 hover:text-red-600 focus:bg-background hover:bg-background data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-10 h-10 xs:ml-1 border cursor-pointer ml-auto mb-2"
                    onClick={() =>
                        set((quiz) => {
                            quiz.questions.splice(index, 1);
                            return { ...quiz };
                        })
                    }>
                    <XIcon />
                </Button>
                <CardTitle>
                    <Textarea
                        className="text-lg"
                        value={question.text}
                        onChange={(e) =>
                            set((quiz) => {
                                quiz.questions[index].text = e.target.value;
                                return { ...quiz };
                            })
                        }
                    />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    value={question.correct !== "" ? question.correct : null}
                    className="grid gap-3"
                    onValueChange={(e) =>
                        set((quiz) => {
                            quiz.questions[index].correct = e;
                            return { ...quiz };
                        })
                    }>
                    {question.answers.map((a, I) => (
                        <span
                            className="flex gap-2 align-middle"
                            key={`${index}-${I}`}>
                            <RadioGroupItem
                                className="my-auto size-5"
                                value={I}
                            />
                            <Input
                                key={`${index}-${I}-Input`}
                                value={a}
                                onChange={(e) =>
                                    set((quiz) => {
                                        quiz.questions[index].answers[I] =
                                            e.target.value;
                                        return { ...quiz };
                                    })
                                }
                            />
                            <XIcon
                                className="my-auto cursor-pointer hover:text-red-600 transition"
                                onClick={() =>
                                    set((quiz) => {
                                        quiz.questions[index].answers.splice(
                                            I,
                                            1
                                        );
                                        if (
                                            quiz.questions[index].correct == I
                                        ) {
                                            quiz.questions[index].correct = "";
                                        }
                                        return [...quiz];
                                    })
                                }
                            />
                        </span>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter>
                <Button
                    variant="outline"
                    className="select-none items-center rounded-xl px-2 py-1.5 text-sm transition-colors focus:text-accent-foreground hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-10 h-10 xs:ml-1 border hover:bg-accent cursor-pointer mx-auto"
                    onClick={() =>
                        set((quiz) => {
                            quiz.questions[index].answers.push("");
                            return { ...quiz };
                        })
                    }>
                    <PlusIcon />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default QuestionBuilder;

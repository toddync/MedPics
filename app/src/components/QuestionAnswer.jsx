import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const QuestionAnswer = ({ question, response, index }) => {
    return (
        <Card className="w-full lg:w-[60%] mx-auto">
            <CardHeader>
                <CardTitle>{question.text}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    className="grid gap-3"
                    value={response}>
                    {question.answers.map((a, I) => {
                        let correct = I == question.correct;
                        let wrong = I == response && !correct;
                        return (
                            <span
                                className={`flex gap-2 align-middle p-1 rounded-xl 
                            ${wrong && "bg-red-400/10"}
                            
                            ${correct && "bg-lime-400/10"}`}
                                key={`${index}-${I}`}>
                                <RadioGroupItem
                                    className="my-auto size-5"
                                    value={I}
                                />
                                {a}
                            </span>
                        );
                    })}
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

export default QuestionAnswer;

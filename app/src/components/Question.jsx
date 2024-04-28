import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const Question = ({ question, response, set, index }) => {
    return (
        <Card className="w-full lg:w-[60%] mx-auto">
            <CardHeader>
                <CardTitle>{question.text}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    className="grid gap-3"
                    defaultValue={response}
                    onValueChange={(e) => {
                        set((s) => {
                            s[index] = e;
                            return [...s];
                        });
                    }}>
                    {question.answers.map((a, I) => (
                        <span
                            className="flex gap-2 align-middle"
                            key={`${index}-${I}`}>
                            <RadioGroupItem
                                className="my-auto size-5"
                                value={I}
                            />
                            {a}
                        </span>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

export default Question;

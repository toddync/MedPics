import { useCallback, useEffect, useState } from "react";
import pb from "../pb";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Toaster } from "../components/ui/toaster";
import { HoverBorderGradient } from "../components/HoverBorder";
import { Label } from "../components/ui/label";
import Editor from "../components/Editor";
import Header, { Page } from "../components/Header";
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import { XIcon } from "lucide-react";
import { ToastAction } from "../components/ui/toast";

const EditModule = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const { toast } = useToast();
    const [data, setData] = useState({
        creator: pb.authStore.model.id,
        title: "",
        description: "",
        content: "",
    });
    const [initialContent, setInitialContent] = useState("");

    const update = useCallback(() => {
        (async () => {
            if (data.title.length > 0 || data.description.length > 0) {
                try {
                    await pb.collection("modules").update(id, data);
                    navigate("/");
                } catch (error) {
                    toast({
                        title: "Error",
                        description: error.message,
                        action: (
                            <ToastAction
                                className="md:hidden"
                                altText={<XIcon />}>
                                <XIcon />
                            </ToastAction>
                        ),
                    });
                }
            } else {
                toast({
                    title: "Error",
                    description: "Fill all the necessary fields",
                    action: (
                        <ToastAction
                            className="md:hidden"
                            altText={<XIcon />}>
                            <XIcon />
                        </ToastAction>
                    ),
                });
            }
        })();
    }, [data, navigate, toast, id]);

    const change = useCallback((e) => {
        console.log(e);
        if (
            (e.target.name == "title" && e.target.value.length <= 50) ||
            (e.target.name == "description" && e.target.value.length <= 500) ||
            (e.target.name == "content" && e.target.value.length <= 10000)
        ) {
            setData((s) => ({ ...s, [e.target.name]: e.target.value }));
        }
    }, []);

    useEffect(() => {
        (async () => {
            let r = await pb.collection("modules").getOne(id);
            setData(r);
            setInitialContent(r.content);
        })();
    }, [id]);

    return (
        <div className="max-w-screen overflow-w-scroll h-full">
            <Header
                logoToHome
                action={
                    <HoverBorderGradient containerClassName="mt-5 w-fit mx-auto absolute right-2 -top-2">
                        <Button
                            variant="outline"
                            className="text-lg"
                            onClick={update}>
                            Update module
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
                <Page
                    text="New module"
                    link="/NewModule"
                />
                <Page
                    text="New quiz"
                    link="/NewQuiz"
                />
            </Header>
            <main className="p-[2.5vw] md:px-[2vw] md:py-10 grid align-center h-full">
                <div className="w-full flex flex-wrap gap-3 pb-5">
                    <div className="w-full lg:max-w-[46vw] flex flex-wrap">
                        <Label className="text-2xl lg:-mb-10 font-bold flex">
                            Title
                            <p className="bg-red-600/80 size-[5px] rounded-full mt-[5px]" />
                            :
                        </Label>
                        <div className="w-full lg:max-w-[35vw] xl:max-w-[45vw] relative">
                            <span className="text-xs md:text-sm text-muted-foreground/50 absolute right-[4px] top-[2px]">
                                {data.title.length}/50
                            </span>
                            <Input
                                className="text-2xl w-full font-bold overflow-hidden hover:border focus-visible:ring-offset-0 focus-visible:ring-[0px]"
                                value={data.title}
                                onChange={change}
                                name="title"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:ml-auto lg:max-w-[46vw] flex flex-wrap">
                        <Label className="text-2xl font-bold">
                            Description:
                        </Label>
                        <div className="w-full lg:max-w-[35vw] xl:max-w-[45vw] relative">
                            <span className="text-xs md:text-sm text-muted-foreground/50 absolute right-[4px] top-[2px]">
                                {data.description.length}/500
                            </span>
                            <Textarea
                                className="text-xl"
                                value={data.description}
                                onChange={change}
                                name="description"
                            />
                        </div>
                    </div>
                </div>
                <Editor
                    name="content"
                    content={initialContent}
                    setContent={change}
                    containerClassName="border-red-600/15"
                />
            </main>
            <Toaster />
        </div>
    );
};

export default EditModule;

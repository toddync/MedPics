import { useCallback, useEffect, useState } from "react";
import { Toaster } from "../components/ui/toaster";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import pb from "../pb";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

export function Signup() {
    const user = useUserStore((s) => s.user);
    const navigate = useNavigate();
    const { toast } = useToast();

    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        professor: false,
        emailVisibility: true,
    });

    const change = useCallback(
        (e) =>
            setCredentials((s) => ({ ...s, [e.target.name]: e.target.value })),
        [setCredentials]
    );

    useEffect(
        () =>
            console.table({
                ...credentials,
                passwordConfirm: credentials.password,
            }),
        [credentials]
    );

    useEffect(() => {
        user && navigate("/");
    }, [user, navigate]);

    const sign = useCallback(async () => {
        try {
            await pb.collection("users").create({
                ...credentials,
                passwordConfirm: credentials.password,
            });

            navigate("/Login");
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
            });
        }
    }, [credentials, toast, navigate]);

    return (
        <>
            <div className=" absolute inset-0 flex items-center justify-center">
                <Card className="max-w-1/4 min-w-fit">
                    <CardHeader>
                        <CardTitle className="text-2xl">Sign up</CardTitle>
                        <CardDescription>
                            Enter your data bellow to create an account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="grid2 gap-4">
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    id="first-name"
                                    name="first_name"
                                    value={credentials.first_name}
                                    onChange={change}
                                    placeholder="Max"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    id="last-name"
                                    name="last_name"
                                    value={credentials.last_name}
                                    onChange={change}
                                    placeholder="Robinson"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={change}
                                placeholder="Max"
                                required
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={change}
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={change}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="grid gap-2 grid-cols-2">
                        <Button
                            className="w-full text-lg"
                            variant="secondary"
                            onClick={sign}>
                            Sign up
                        </Button>

                        <p className="text-sm ml-auto">
                            Not registered?
                            <a
                                className="text-md ml-0.5 italic font-bold underline cursor-pointer"
                                onClick={() => navigate("/Login")}>
                                Log in
                            </a>
                        </p>
                    </CardFooter>
                </Card>
            </div>
            <Toaster />
        </>
    );
}
export default Signup;

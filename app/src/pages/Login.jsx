import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Toaster } from "../components/ui/toaster";
import { useToast } from "../components/ui/use-toast";
import useUserStore from "../stores/userStore";
import pb from "../pb";

export function Login() {
    const { user, log } = useUserStore();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        identity: "",
        password: "",
    });

    const change = useCallback(
        (e) =>
            setCredentials((s) => ({ ...s, [e.target.name]: e.target.value })),
        []
    );

    const login = useCallback(() => {
        (async () => {
            try {
                await pb
                    .collection("users")
                    .authWithPassword(
                        credentials.identity,
                        credentials.password
                    );

                log();
            } catch (error) {
                console.error("error logging user: ", error.message);
                toast({
                    title: "Error",
                    description: error.message,
                });
            }
        })();
    }, [credentials, log, toast]);

    useEffect(() => {
        user && navigate("/");
    }, [user, navigate]);

    return (
        <>
            <div className="absolute inset-0 flex items-center justify-center">
                <Card className="max-w-1/4 min-w-fit">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Username or Email</Label>
                            <Input
                                type="text"
                                name="identity"
                                onChange={change}
                                value={credentials.email}
                                placeholder="Max or m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                onChange={change}
                                value={credentials.password}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="grid grid-cols-2 gap-2">
                        <Button
                            onClick={login}
                            className="w-full text-lg"
                            variant="secondary">
                            Log in
                        </Button>
                        <p className="text-sm ml-auto">
                            Have an account?
                            <a
                                className="text-md ml-0.5 italic font-bold underline cursor-pointer"
                                onClick={() => navigate("/Signup")}>
                                Sign up
                            </a>
                        </p>
                    </CardFooter>
                </Card>
            </div>
            <Toaster />
        </>
    );
}
export default Login;

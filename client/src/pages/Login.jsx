import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLogInMutation, useRegisterMutation } from "@/features/apis/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Login() {
    const [logInInput, setLogInInput] = useState({
        email: "",
        password: "",
    });
    const [signUpInput, setSignUpInput] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [
        register,
        {
            isLoading: registerIsLoading,
            data: registerData,
            error: registerError,
            isSuccess: registerSuccess
        },
    ] = useRegisterMutation();
    const [
        logIn,
        { isLoading: logInIsLoading,
            data: loginData,
            error: loginError,
            isSuccess: loginSuccess
        },
    ] = useLogInMutation();

    function onChangeHandler(e, type) {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignUpInput((prev) => ({ ...prev, [name]: value }));
        } else {
            setLogInInput((prev) => ({ ...prev, [name]: value }));
        }
    }

    async function handleRegister(type) {
        const inputData = type === "signup" ? signUpInput : logInInput;
        const action = type === "signup" ? register : logIn;
        await action(inputData);
    }
    useEffect(() => {
        if (registerSuccess && registerData) {
            toast.success(registerData.msg || 'Signup Successfully')
        }
        if (registerError) {
            toast.error(registerData.msg || 'Signup Faild')
        }
        if (loginSuccess && loginData) {
            toast.success(loginData.msg || 'Login Successfully')
        }
        if (loginError) {
            toast.error(loginData.msg || 'Signup Faild')
        }
    }, [
        registerIsLoading,
        registerData,
        registerError,
        logInIsLoading,
        loginData,
        loginError,
        registerSuccess,
        loginSuccess
    ])

    return (
        <div className="flex items-center w-full justify-center">
            <Tabs defaultValue="signup" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>Sign up to get started!</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={signUpInput.name}
                                    onChange={(e) => onChangeHandler(e, "signup")}
                                    placeholder="Eg. Aman"
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={signUpInput.email}
                                    onChange={(e) => onChangeHandler(e, "signup")}
                                    placeholder="Eg. xyz@gmail.com"
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={signUpInput.password}
                                    onChange={(e) => onChangeHandler(e, "signup")}
                                    placeholder="Eg. xyz@123"
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                disabled={registerIsLoading}
                                onClick={() => handleRegister("signup")}
                            >
                                {registerIsLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Signup"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>Log in to continue!</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={logInInput.email}
                                    onChange={(e) => onChangeHandler(e, "login")}
                                    placeholder="Eg. xyz@gmail.com"
                                    required
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={logInInput.password}
                                    onChange={(e) => onChangeHandler(e, "login")}
                                    placeholder="Eg. xyz@123"
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                disabled={logInIsLoading}
                                onClick={() => handleRegister("login")}
                            >
                                {logInIsLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

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
import { useState } from "react";

export default function Login() {
    const [logInInput, setLogInInput] = useState({
        email: "",
        pasword: "",
    });
    const [signUpInput, setSignUpinput] = useState({
        name: "",
        email: "",
        password: "",
    });
    function onChangeHadler(e, type) {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignUpinput({ ...signUpInput, [name]: value });
        } else {
            setLogInInput({ ...logInInput, [name]: value });
        }
    }
    function handelRegister(type) {
        const inputData = type === 'signup' ? signUpInput : logInInput;
        console.log(inputData);

    }
    return (
        <div className="flex items-center w-ful  justify-center">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="Signup">Signup</TabsTrigger>
                    <TabsTrigger value="Login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="Signup">
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
                                    onChange={(e) => onChangeHadler(e, 'signup')}
                                    placeholder={"Eg. Aman"}
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    type="email"
                                    name='email'
                                    value={signUpInput.email}
                                    onChange={(e) => onChangeHadler(e, 'signup')}
                                    placeholder={"Eg. xyz@gmail.com"}
                                    require='true' />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="passeord">Password</Label>
                                <Input
                                    type="password"
                                    name='password'
                                    value={signUpInput.password}
                                    onChange={(e) => onChangeHadler(e, 'signup')}
                                    placeholder={"Eg. xyz"}
                                    require='true' />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => {
                                    handelRegister('signup')
                                }}>Signup</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="Login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>Log in to continue!</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="space-y-3">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    type="email"
                                    name='email'
                                    value={logInInput.email}
                                    onChange={(e) => onChangeHadler(e, 'login')}
                                    placeholder={"Eg. xyz@gmail.com"}
                                    require='true' />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="passeord">Password</Label>
                                <Input
                                    type="password"
                                    name='password'
                                    value={logInInput.password}
                                    onChange={(e) => onChangeHadler(e, 'login')}
                                    placeholder={"Eg. xyz"}
                                    require='true' />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                onClick={() => {
                                    handelRegister('login')
                                }}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

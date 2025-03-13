import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react";
import Course from "./Course";
import { useLoadUserProfileQuery, useUpdateUserProfileMutation } from "@/features/apis/authApi";

const Profile = () => {
    const { data, isLoading } = useLoadUserProfileQuery()
    const [updateUserProfiler, { data: updatedData, isLoading: updatedDataIsLoading, error }] = useUpdateUserProfileMutation()

    if (isLoading) { return (<h1>Profile is Loading</h1>) }

    const user = data.user
    function upadteUserHandler() {

    }

    return (
        <div className=" max-w-7xl mx-auto my-24  px-4 md:px-0">
            <h1 className="font-bold text-2xl text-center md:text-left">MY PROFILE</h1>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
                <div className="flex flex-col items-center mb-4">
                    <Avatar className='h-24 w-24 md:h-32 md:w-32'>
                        <AvatarImage src={user.photoUrl || 'https://github.com/shadcn.png'} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col gap-4">
                    <div >
                        <h2 className="font-semibold text-gray-900 dark:text-gray-200 text-xl">
                            Name: <span className="text-lg text-gray-700 dark:text-gray-300 ml-2">{user.name}</span>
                        </h2>
                    </div>
                    <div >
                        <h2 className="font-semibold text-gray-900 dark:text-gray-200 text-xl">
                            Email: <span className="text-lg text-gray-700 dark:text-gray-300 ml-2">{user.email}</span>
                        </h2>
                    </div>
                    <div >
                        <h2 className="font-semibold text-gray-900 dark:text-gray-200 text-xl">
                            Role: <span className="text-lg text-gray-700 dark:text-gray-300 ml-2">{user.role.toUpperCase()}</span>
                        </h2>
                    </div>
                    <div className="mt-2">
                        <Dialog >
                            <DialogTrigger asChild>
                                <Button className='bg-gray-900 dark:bg-gray-300 text-white dark:text-gray-900 '>Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input id="name" placeholder="Pedro Duarte" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="">
                                            Profile Photo
                                        </Label>
                                        <Input id="image" type='file' accept='image/*' className="col-span-3" />
                                    </div>

                                </div>
                                <DialogFooter>
                                    <Button disabled={isLoading} onClick={upadteUserHandler}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin " />Plaese Wait
                                            </>
                                        ) : 'Save Cahnges'}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <h3 className="font-semibold text-2xl mb-4">Courses You're Enrolled in</h3>
                {isLoading ? (
                    <>
                        <MyLearningSkeleton />
                    </>
                ) : (
                    <>
                        {user.enrolledCourses.length === 0 ? (<p>
                            You Are Not Enrolled In Any Courses
                        </p>) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                                {user.enrolledCourses.map((course) => {
                                    return (

                                        <Course course={course} key={course._id} />

                                    )
                                })}
                            </div>
                        )

                        }
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
const MyLearningSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
            <div
                key={index}
                className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
            ></div>
        ))}
    </div>
);
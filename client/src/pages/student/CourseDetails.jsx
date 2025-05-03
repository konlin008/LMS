import BuyCourseBtn from "@/components/BuyCourseBtn";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";

const CourseDetails = () => {
    const purchased = false
    return (
        <div className="mt-24 space-y-5">
            <div className="bg-[#2D2F31] text-white">
                <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
                    <h1 className="font-bold text-2xl md:text-3xl">course Title</h1>
                    <p className="text-base md:text-lg">Course Sub-Title</p>
                    <p className="">
                        created by{" "}
                        <span className="text-[#C0C4FC] underline italic">Aman Mondal</span>
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                        <BadgeInfo size={16} />
                        <p>Last Updated 03-05-2025</p>
                    </div>
                    <p>students Enrolled: 10</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
                <div className="w-full lg:w-1/2 space-y-5">
                    <h1 className="font-bold text-xl md:text-2xl">Description</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias non
                        consequuntur voluptate quam, voluptatum dolorum soluta explicabo nam
                        incidunt doloribus distinctio ex cumque maxime nihil. Odit ducimus
                        ut labore commodi.
                    </p>
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Content</CardTitle>
                            <CardDescription>4 Lectures</CardDescription>
                        </CardHeader>
                        <CardContent className={"space-y-3"}>
                            {[1, 23, null].map((course, id) => (
                                <div key={id} className="flex items-center text-sm gap-3">
                                    <span>
                                        {course ? <PlayCircle size={14} /> : <Lock size={14} />}
                                    </span>
                                    <p>Lecture Title</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full lg:w-1/3">
                    <Card>
                        <CardContent className={"p-4 flex flex-col"}>
                            <div className="w-full aspect-video mb-4">coming soon</div>
                            <h1>Lecture Title</h1>
                            <Separator className={"my-2"} />

                            <h1 className="text-lg md:text-xl font-semibold">
                                Course Price: {999}
                            </h1>
                        </CardContent>
                        <CardFooter className={'flex justify-center p-4'}>
                            {
                                purchased ? (<Button className={'w-full'}>Continue Course</Button>) : <BuyCourseBtn />
                            }

                        </CardFooter>
                    </Card>
                </div>
            </div >
        </div >
    );
};

export default CourseDetails;

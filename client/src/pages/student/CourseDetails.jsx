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
import { useGetCourseStatusQuery } from "@/features/apis/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetails = () => {
    const params = useParams();
    const courseId = params.courseId;
    const { data, isLoading, error } = useGetCourseStatusQuery({ courseId });
    const navigate = useNavigate()
    if (isLoading) return (<h1>Loading...</h1>)
    if (error) return (<h1>Faild To Load Course Details</h1>)
    const { course, purchased } = data
    console.log(course);
    const continueCourseHandler = () => {
        if (purchased) navigate(`/course-progress/${courseId}`)
    }
    return (
        <div className="mt-24 space-y-5">
            <div className="bg-[#2D2F31] text-white">
                <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
                    <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
                    <p className="text-base md:text-lg">{course?.courseSubTitle}</p>
                    <p className="">
                        created by{" "}
                        <span className="text-[#C0C4FC] underline italic">{course?.creator.name}</span>
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                        <BadgeInfo size={16} />
                        <p>Last Updated {course?.updatedAt.split('T')[0]}</p>
                    </div>
                    <p>students Enrolled: {course?.enrolledStudent.length}</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
                <div className="w-full lg:w-1/2 space-y-5">
                    <h1 className="font-bold text-xl md:text-2xl">Description</h1>
                    <p>
                        {course?.description}
                    </p>
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Content</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className={"space-y-3"}>
                            {course?.lecture.map((lecture, id) => (
                                <div key={id} className="flex items-center text-sm gap-3">
                                    <span>
                                        {lecture ? <PlayCircle size={14} /> : <Lock size={14} />}
                                    </span>
                                    <p>{lecture?.title}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full lg:w-1/3">
                    <Card>
                        <CardContent className={"p-4 flex flex-col"}>
                            <div className="w-full aspect-video mb-4">
                                <ReactPlayer
                                    width={'100 %'}
                                    height={'100%'}
                                    url={course?.lecture[0].videoUrl}
                                    controls={true}
                                />
                            </div>
                            <h1 className="font-semibold">{course?.lecture[0].title}</h1>
                            <Separator className={"my-2"} />

                            {purchased ? "" : (
                                <h1 className="text-lg md:text-xl font-semibold">
                                    Course Price: {course?.coursePrice}
                                </h1>
                            )}
                        </CardContent>
                        <CardFooter className={'flex justify-center p-4'}>
                            {
                                purchased ? (<Button onClick={continueCourseHandler} className={'w-full'}>Continue Course</Button>) : <BuyCourseBtn courseId={courseId} />
                            }

                        </CardFooter>
                    </Card>
                </div>
            </div >
        </div >
    );
};

export default CourseDetails;

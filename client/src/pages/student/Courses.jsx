import React from "react";
import Course from "./Course";
import { useGetPublishedCoursesQuery } from "@/features/apis/courseApi";
import CourseSkeleton from "@/components/CourseSkeleton";

export const Courses = () => {
    const { data, isLoading, error } = useGetPublishedCoursesQuery()
    if (error) {
        return (
            <h1>Error Occurred While Fetching Course</h1>
        )
    }
    const courses = data?.courses

    return (
        <div className="bg-white dark:bg-[#020618] w-full">
            <div className="max-w-7xl mx-auto p-6 ">
                <h1 className="font-bold text-3xl text-center mb-10">Our Courses</h1>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, index) => {
                            return <CourseSkeleton key={index} />;
                        })
                        : courses?.map((course, index) => <Course key={index} course={course} />)}
                </div>
            </div>
        </div>
    );
};

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const Courses = () => {
    const isLoading = true;
    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto p-6 ">
                <h1 className="font-bold text-3xl text-center mb-10">Our Courses</h1>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, index) => {
                            return <CourseSkeleton key={index} />;
                        })
                        : ""}
                </div>
            </div>
        </div>
    );
};
const CourseSkeleton = () => {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
            <Skeleton className="w-full h-36" />
            <div className="px-5 py-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-1/4" />
            </div>
        </div>
    );
};

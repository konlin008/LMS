import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import React from "react"; import { Link } from "react-router-dom";
;

const Course = ({ course }) => {
    console.log(course);
    return (
        <Link to={`/course-details/${course?._id}`}>
            <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:sc-105 transition-all duration-300 pt-0 ">
                <div className="relative">
                    <img
                        src={`${course?.courseThumbnail}` || `https://mdbootstrap.com/wp-content/uploads/2019/01/html.jpg`}
                        alt="Course"
                        className="w-full h-36 rounded-t-lg"
                    />
                </div>
                <CardContent className="flex flex-col space-y-3 w-full">
                    <h1 className="hover:underline font-bold text-lg truncate">
                        {course?.courseTitle}
                    </h1>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 ">
                            <Avatar>
                                <AvatarImage src={course?.creator?.photoUrl || 'cn'} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className="text-sm mr-4">{`${course?.creator?.name}` || `Aman Mondal`}</h1>
                        </div>
                        <Badge className="bg-[#2C5F2D] text-white text-xs rounded-full">{`${course?.courseLevel}`}</Badge>
                    </div>
                    <div>
                        <span className="text-lg font-bold">
                            Price: ₹{`${course?.coursePrice}`}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default Course;

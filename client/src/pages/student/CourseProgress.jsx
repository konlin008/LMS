import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CirclePlay } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";

const CourseProgress = () => {
  const isCompleted = false;
  return (
    <div className="max-w-7xl mx-auto p-4 mt-24">
      <div className=" flex justify-between mb-4">
        <h1 className="text-2xl font-bold"> Course Title</h1>
        <Button>Completed</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            {/* Video */}
            {/* <ReactPlayer /> */}
          </div>
          {/* Display Current Video Title */}
          <div className="mt-2">
            <h3 className="font-medium text-lg">Lecture-1: Introduction</h3>
          </div>
        </div>
        {/* Lecture SideBar */}
        <div className="flex flex-col md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {[1, 2, 3, 4, 5].map((lecture, index) => {
              return (<Card
                key={index}
                className={"mb-3 hover:cursor-pointer transition-transform"}>

                <CardContent className={"flex items-centern justify-between  p-1"}>
                  <div className="flex items-center">
                    <div >
                      {isCompleted ? (
                        <CheckCircle2 size={24} className="text-green-500 mr-2" />
                      ) : (
                        <CirclePlay size={24} className="text-gray-500 mr-2" />
                      )}
                    </div>
                    <div>
                      <CardTitle>Intro</CardTitle>
                    </div>
                  </div>
                  <Badge variant={'outline'} className={'bg-green-200 text-green-600'} > Completed</Badge>
                </CardContent>
              </Card>)
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;

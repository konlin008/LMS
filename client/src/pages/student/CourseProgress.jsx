import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useGetCourseProgressQuery, useLectureProgressMutation, useMarkAsCompleteMutation, useMarkAsIncompleteMutation } from "@/features/apis/courseProgress.Api";
import { CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const [currentLecture, setCurrentlecture] = useState(null)
  const params = useParams();
  const courseId = params.courseId;
  const { data, isError, isLoading, refetch } = useGetCourseProgressQuery({ courseId });
  const [lectureProgress] = useLectureProgressMutation();
  const [markAsComplete, { isSuccess: completedIsSuccess }] = useMarkAsCompleteMutation();
  const [markAsIncomplete, { isSuccess: incompletedIsSuccess, }] = useMarkAsIncompleteMutation();
  useEffect(() => {
    if (completedIsSuccess) {
      refetch();
      toast.success('Course completed. Great job!')
    }
    if (incompletedIsSuccess) {
      refetch();
      toast.warning('Course Marked As Incompleted')
    }
  }, [completedIsSuccess, incompletedIsSuccess])
  if (isLoading) {
    return (<p>Loading...</p>)
  }
  if (isError) {
    return <p>Some thing Went Wrong</p>
  }
  const { courseDetails, progress, completed } = data.data
  const initialLecture = currentLecture || courseDetails.lecture && courseDetails.lecture[0]

  const isLectureCompleted = (lectureId) => {
    return progress?.some((prog) => prog.lectureId === lectureId && prog.viewed)
  }

  const handelSelectlecture = (lecture) => {
    setCurrentlecture(lecture)
  }
  const handelLectureProgress = async (lectureId) => {
    await lectureProgress({ courseId, lectureId })
    refetch();
  }
  const handelCompleteCourse = async () => {
    await markAsComplete({ courseId })
    refetch();
  }
  const handelIncompleteCourse = async () => {
    await markAsIncomplete({ courseId })
    refetch();
  }

  return (
    <div className="max-w-7xl mx-auto p-4 mt-24">
      <div className=" flex justify-between mb-4">
        <h1 className="text-2xl font-bold"> {courseDetails?.courseTitle}</h1>
        <Button onClick={completed ? handelIncompleteCourse : handelCompleteCourse}>
          {
            completed ? (<div className="flex items-center justify-between">  <span>Marked as Complete</span> </div>) : (<div className="  flex items-center justify-between">  <span>Marked as   Incomplete</span> </div>)
          }
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>

            <video
              src={currentLecture?.videoUrl || initialLecture?.videoUrl}
              controls={true}
              className="w-full h-auto md:rounded-lg"
              onPlay={() => handelLectureProgress(currentLecture?._id || initialLecture?._id)}
            />
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-lg">Lecture {courseDetails.lecture.findIndex((lec) => lec._id === (currentLecture?._id || initialLecture?._id)) + 1} : {currentLecture?.title || initialLecture?.title}</h3>
          </div>
        </div>
        <div className="flex flex-col md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lecture.map((lecture) => {
              return (<Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition-transform ${lecture._id === currentLecture?._id ? 'bg-gray-200' : 'dark:bg-gray-800'} `}
                onClick={() => handelSelectlecture(lecture)}
              >

                <CardContent className={"flex items-centern justify-between  p-1"}>
                  <div className="flex items-center">
                    <div >
                      {isLectureCompleted(lecture._id) ? (
                        <CheckCircle2 size={24} className="text-green-500 mr-2" />
                      ) : (
                        <CirclePlay size={24} className="text-gray-500 mr-2" />
                      )}
                    </div>
                    <div>
                      <CardTitle>{lecture.title}</CardTitle>
                    </div>
                  </div>
                  {
                    isLectureCompleted(lecture._id) ? (<Badge variant={'outline'} className={'bg-green-200 text-green-600'} > Completed</Badge>) : ''
                  }

                </CardContent>
              </Card>)
            })}
          </div>
        </div>
      </div>
    </div >
  );
};

export default CourseProgress;

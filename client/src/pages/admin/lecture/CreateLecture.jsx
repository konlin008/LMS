import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/apis/courseApi";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState();
  const parms = useParams();
  const courseId = parms.courseId;
  const navigate = useNavigate();
  const [CreateLecture, { data, error, isSuccess, isLoading }] =
    useCreateLectureMutation();
  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureErr,
    refetch
  } = useGetCourseLectureQuery({ courseId });
  const createLecturehandler = async () => {
    try {
      await CreateLecture({
        courseId: courseId,
        title: lectureTitle,
        videoUrl: "https://dummyurl.com/video.mp4",
      });
    } catch (error) {
      console.error("Error creating lecture:", error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg || `Course Created Successfully`);
      refetch();
    }
    if (error) {
      toast.error(error.data.msg || `Error creating lecture`);
    }
  }, [isSuccess, data, error]);
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add Course & add some basic details for new course
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
          aliquam.
        </p>
      </div>
      <div className="flex flex-col space-y-10">
        <div className="flex  flex-col gap-3">
          <Label>Title</Label>
          <Input
            type={"text"}
            placeholder={"Your Course Title"}
            className={"max-w-2xl"}
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={"outline"}
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back Course
          </Button>
          <Button disabled={isLoading} onClick={createLecturehandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr- h-4 w-4 animate-spin " />
                Please Wait
              </>
            ) : (
              "Create Leacture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <p>Lecture Loading</p>
          ) : lectureErr ? (
            <p>Faild to Load Lecture</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No Lecture Availabel</p>
          ) : (
            lectureData.lectures.map((lecture, index) => {
              return (< Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index} />)
            })

          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;

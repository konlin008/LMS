import { Switch } from "@/components/Switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useEditLectureMutation, useGetLectureQuery, useRemoveLectureMutation } from "@/features/apis/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const mediaUrl = import.meta.env.VITE_MEDIA_API;

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const params = useParams();
  const { courseId, lectureId } = params;
  const navigate = useNavigate()

  const [editLecture, { data, error, isLoading, isSuccess }] =
    useEditLectureMutation();
  const [removeLecture, { data: removeLectureData, error: removeLectureError, isLoading: removeLectureIsLoading, isSuccess: removeLectureIsSuccess }] = useRemoveLectureMutation()

  const { data: lectureData, refetch } = useGetLectureQuery({ lectureId })
  const lecture = lectureData?.lecture
  useEffect(() => {
    if (lecture) {
      setTitle(lecture.title)
      setIsFree(lecture.isPreviewFree)
    }
  }, [lecture])

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${mediaUrl}/uploadVideo`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data) {
          setVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
        }
        toast.success("Video uploaded successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };
  const editLectureHandler = async () => {
    await editLecture({
      courseId,
      lectureId,
      lectureTitle: title,
      videoInfo: videoInfo,
      isPreviewFree: isFree,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg || "Lecture Updated");
      refetch();
    }
    if (error) {
      toast.error(error.msg || "Lecture Update Faild");
    }
  }, [isSuccess, error, data, refetch]);
  const handleToggle = (value) => {
    setIsFree(value);
  };
  const removeLectureHandler = async () => {
    removeLecture({ lectureId })
  }
  useEffect(() => {
    if (removeLectureIsSuccess) {
      toast.success(removeLectureData.msg || "Lecture Removed Succesfully");
      navigate(`/admin/course/${courseId}/lecture`)
    }
    if (removeLectureError) {
      toast.error(removeLectureError.msg || "Intrenal Server Error");
    }
  }, [removeLectureIsSuccess, removeLectureError, removeLectureData, courseId, navigate]);
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make Changes And Click Save When Done
          </CardDescription>
          <div>
            <Button
              onClick={removeLectureHandler}
              disabled={removeLectureIsLoading || mediaProgress || isLoading}
              className={"mt-2 bg-red-500"}>
              {
                removeLectureIsLoading ?
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Please Wait
                  </>
                  : 'Remove Lecture'
              }
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              type={"text"}
              placeholder={"Ex. Introduction to Java Script"}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="space-y-2 ">
            <Label>
              Video<span className="text-red-600">*</span>
            </Label>
            <Input
              type={"file"}
              onChange={fileChangeHandler}
              placeholder={"Ex. Introduction to Java Script"}
              className={"w-fit"}
            />
          </div>
          <div className="my-5">
            <Switch checked={isFree} onChange={handleToggle} />
            <span className="mt-2 ml-2">Is This video Free?</span>
          </div>
          {mediaProgress && (
            <div className="my-4">
              <Progress value={uploadProgress} />
              <p>{uploadProgress}% uploaded</p>
            </div>
          )}
          <div>
            <Button onClick={editLectureHandler} disabled={isLoading || mediaProgress || removeLectureIsLoading}>
              {
                isLoading ? (<>
                  <Loader2 className="h-4 w-4 animate-spin " />Please Wait
                </>) : 'Update Lecture'
              }
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;

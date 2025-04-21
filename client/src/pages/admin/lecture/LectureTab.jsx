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
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const mediaUrl = import.meta.env.VITE_MEDIA_API

const LectureTab = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [title, setTitle] = useState('')
    const [videoInfo, setVideoInfo] = useState(null)
    const [isFree, setIsFree] = useState(false)
    const [mediaProgress, setMediaProgress] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)


    const fileChangeHandler = async (e) => {
        const file = e.target.file[0]
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            setMediaProgress(true)
            try {
                const res = await axios.post(`${mediaUrl}/uploadVideo`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round(loaded * 100) / total)
                    }
                })
                if (res.data.success) {
                    setVideoInfo({
                        videoUrl: res.data.data.url,
                        publicId: res.data.data.public_id
                    })
                    setIsEnabled(false)
                    toast.success
                }
            } catch (error) {
                console.log(error);
                toast.error('Video Upload Faild')
            }
            finally {
                setMediaProgress(true)
            }
        }
    }


    const handleToggle = (value) => {
        setIsEnabled(value);
    };
    return (
        <Card>
            <CardHeader>
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>
                        Make Changes And Click Save When Done
                    </CardDescription>
                    <div>
                        <Button className={"mt-2 bg-red-500"}>Remove Lecture</Button>
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
                        />
                    </div>
                    <div className="space-y-2 ">
                        <Label>
                            Video<span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type={"file"}
                            placeholder={"Ex. Introduction to Java Script"}
                            className={'w-fit'}
                        />
                    </div>
                    <div className="my-5">
                        <Switch checked={isEnabled} onChange={handleToggle} />
                        <span className="mt-2 ml-2">Is This video Free?</span>
                    </div>
                    {
                        mediaProgress && (
                            <div className="my-4">
                                <Progress value={uploadProgress} />
                                <p>{uploadProgress} %uploaded</p>
                            </div>
                        )
                    }
                    <div>
                        <Button>Update Lecture</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default LectureTab;

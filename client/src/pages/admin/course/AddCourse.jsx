import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/apis/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
    const [createCourse, { data, isLoading, isError, error, isSuccess }] = useCreateCourseMutation()
    const [courseTitle, setCourseTitle] = useState('')
    const [category, setCategory] = useState('')


    const navigate = useNavigate()


    const getSelectedCategory = (value) => {
        setCategory(value)
    }

    const createCourseHandler = async () => {
        await createCourse({ courseTitle, category })
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.msg || 'Course Created Successfully')
        }
        if (isError) {
            console.log(error);
        }
    }, [data, isLoading, isError, error, isSuccess])

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
                        className={'max-w-2xl'}
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                    />
                </div>
                <div className="flex  flex-col gap-3" >
                    <Label>Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="frontend">Frontend</SelectItem>
                                <SelectItem value="backend">Backend</SelectItem>
                                <SelectItem value="fullstack">Fullstack</SelectItem>
                                <SelectItem value="devops">DevOps</SelectItem>
                                <SelectItem value="mobile">Mobile Development</SelectItem>
                                <SelectItem value="ai">Artificial Intelligence</SelectItem>
                                <SelectItem value="data-science">Data Science</SelectItem>
                                <SelectItem value="cloud">Cloud Computing</SelectItem>
                                <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                                <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                                <SelectItem value="game-dev">Game Development</SelectItem>
                                <SelectItem value="blockchain">Blockchain</SelectItem>
                                <SelectItem value="embedded">Embedded Systems</SelectItem>
                                <SelectItem value="qa">Quality Assurance</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-2" >
                    <Button variant={'outline'} onClick={() => navigate('/admin/course')}>Back</Button>
                    <Button disabled={isLoading} onClick={createCourseHandler}>
                        {
                            isLoading ? (<>
                                <Loader2 className="mr- h-4 w-4 animate-spin " />
                                Please Wait
                            </>) : 'Create'

                        }
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;

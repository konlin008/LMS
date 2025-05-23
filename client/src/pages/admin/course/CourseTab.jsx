import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation, useGetCourseDetailsQuery, usePublishCourseMutation } from "@/features/apis/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [editCourse, { data, error, isLoading, isSuccess }] = useEditCourseMutation();

    const [input, setInput] = useState({
        courseTitle: "",
        courseSubTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
    });
    const [previewThumbnail, SetPreviewThubmnail] = useState("");
    const { data: courseData, refetch } = useGetCourseDetailsQuery(courseId)
    const course = courseData?.course

    const [publishCourse] = usePublishCourseMutation()
    useEffect(() => {
        if (course) {
            setInput({
                courseTitle: course.courseTitle || "",
                courseSubTitle: course.courseSubTitle || "",
                description: course.description || "",
                category: course.category || "",
                courseLevel: course.courseLevel || "",
                coursePrice: course.coursePrice || "",
                courseThumbnail: "",
            });
        }
    }, [course, setInput])
    const changeEventHandeler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };
    const selectCategoryHandler = (value) => {
        setInput({ ...input, category: value });
    };
    const selectLevelHandler = (value) => {
        setInput({ ...input, courseLevel: value });
    };
    const changeFilelHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                SetPreviewThubmnail(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };
    const updateCourse = async () => {
        const { courseTitle, courseSubTitle, description, category, courseLevel, coursePrice, courseThumbnail } = input;
        if (!courseTitle || !courseSubTitle || !description || !category || !courseLevel || !coursePrice || !courseThumbnail) {
            toast.error("All fields are required!");
            return;
        }
        const formData = new FormData();
        formData.append('courseTitle', input.courseTitle)
        formData.append('courseSubTitle', input.courseSubTitle)
        formData.append('description', input.description)
        formData.append('category', input.category)
        formData.append('courseLevel', input.courseLevel)
        formData.append('coursePrice', input.coursePrice)
        formData.append('courseThumbnail', input.courseThumbnail)
        editCourse({ formData, courseId })
    }
    const publishStatusHandler = async (action) => {
        if (course.lecture.length === 0) {
            toast.error("Add a Lecture First")
            return
        }
        try {

            const response = await publishCourse({ courseId: courseId, query: action })
            if (response.data) {
                refetch()
                toast.success(response.data.msg)
            }
        } catch (error) {
            toast.error('Faild to Publish or Unpublish')
            console.log(error);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.msg || 'Course Updated Success')
        }
        if (error) {
            toast.error(error.msg || 'Course not Updated')
        }
    }, [data, error, isSuccess])


    return (
        <Card>
            <CardHeader className={"flex flex-row justify-between"}>
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>
                        Make Changes to your courses here. Click save when you're done
                    </CardDescription>
                </div>
                <div className="space-x-3">
                    <Button
                        variant={"outline"} onClick={() => publishStatusHandler(course?.isPublished ? 'false' : 'true')} >
                        {course?.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button>Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-7 mt-5">
                    <div>
                        <Label className="font-semibold text-md">Title</Label>
                        <Input
                            name={"courseTitle"}
                            type={"text"}
                            value={input.courseTitle}
                            onChange={changeEventHandeler}
                            placeholder={"Ex. Full Stck Devloper"}
                        />
                    </div>
                    <div>
                        <Label className="font-semibold text-md">Sub Title</Label>
                        <Input
                            name={"courseSubTitle"}
                            type={"text"}
                            value={input.courseSubTitle}
                            onChange={changeEventHandeler}
                            placeholder={"Ex. Become a Full Stck Devloper"}
                        />
                    </div>
                    <div>
                        <Label className="font-semibold text-md">Description</Label>
                        <Input
                            name={"description"}
                            type={"text"}
                            value={input.description}
                            onChange={changeEventHandeler}
                            placeholder={"course description"}
                        />
                    </div>
                    <div className="flex items-center gap-5">
                        <div>
                            <Label className="font-semibold text-md">Category</Label>
                            <Select value={input.category} onValueChange={selectCategoryHandler}>
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
                                        <SelectItem value="quality">Quality Assurance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="font-semibold text-md">Course Level</Label>
                            <Select value={input.courseLevel} onValueChange={selectLevelHandler}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="font-semibold text-md">Price (INR)</Label>
                            <Input
                                type={"number"}
                                name={"coursePrice"}
                                value={input.coursePrice}
                                onChange={changeEventHandeler}
                                placeholder={"999"}
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="font-semibold text-md">Course Thumbnail</Label>
                        <Input
                            type="file"
                            onChange={changeFilelHandler}
                            accept={"image/*"}
                            className={"w-fit"}
                        />
                        {
                            previewThumbnail && (
                                <img src={previewThumbnail} className="h-50 2-60 my-2 rounded" alt={'Course Thumbnail'} />
                            )

                        }
                    </div>
                    <div className="space-x-2">
                        <Button
                            onClick={() => navigate("/admin/course")}
                            variant={"outline"}
                        >
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={updateCourse}>
                            {isLoading ? (
                                <>
                                    <Loader2 className=" h-4 w-4 animate-spin" /> Please Wait
                                </>
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseTab;

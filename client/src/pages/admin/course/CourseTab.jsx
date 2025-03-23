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
import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const CourseTab = () => {
    const navigate = useNavigate();
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
        const file = e.target.file?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                SetPreviewThubmnail(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };
    const isPublished = true;
    const isLoading = false;

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
                    <Button variant={"outline"}>
                        {isPublished ? "Unpublished" : "Published"}
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
                            <Select onChange={selectCategoryHandler}>
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
                        <div>
                            <Label className="font-semibold text-md">Course Level</Label>
                            <Select onChange={selectLevelHandler}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advance">Advance</SelectItem>
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
                            {
                            ...previewThumbnail ? (
                                <img src={previewThumbnail} />
                            )
                                : ''
                            }
                        />
                    </div>
                    <div className="space-x-2">
                        <Button
                            onClick={() => navigate("/admin/course  ")}
                            variant={"outline"}
                        >
                            Cancel
                        </Button>
                        <Button disabled={isLoading}>
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

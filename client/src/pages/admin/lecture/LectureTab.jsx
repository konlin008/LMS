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
import React from "react";

const LectureTab = () => {
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
                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input type={'text'} placeholder={'Ex. Introduction to Java Script'} />
                </div>
            </CardContent>
        </Card>
    );
};

export default LectureTab;

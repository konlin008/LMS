import { Button } from "@/components/ui/button";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "@/features/apis/courseApi";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

const CoursesTable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCreatorCourseQuery()
  if (isLoading) {
    return <LoadingSpinner />
  };
  const creatorCourses = data?.courses


  return (
    <div>
      <Button
        onClick={() => {
          navigate("create");
        }}
      >
        Create A New Course{" "}
      </Button>
      <Table className="mt-5">
        <TableCaption>A list of your Courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {creatorCourses.map((course) => (
            <TableRow key={course?._id}>
              <TableCell className="font-medium">{course?.courseTitle}</TableCell>
              <TableCell>{course?.coursePrice || 'NA'}</TableCell>
              <TableCell><Badge>{course?.isPublished ? "Published" : "Draft"}</Badge></TableCell>
              <TableCell className="text-right"> <Button size={'sm'} variant={'outline'} onClick={() => navigate(course?._id)}> <Edit /></Button></TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  );
};

export default CoursesTable;

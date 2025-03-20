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

const CoursesTable = () => {
  const arr = [1, 2, 3, 4];
  const navigate = useNavigate();
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
          {arr.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">Course Title</TableCell>
              <TableCell>$44</TableCell>
              <TableCell>Published</TableCell>
              <TableCell className="text-right">Edit</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
      </Table>
    </div>
  );
};

export default CoursesTable;

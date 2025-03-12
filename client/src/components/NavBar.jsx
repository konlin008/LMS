import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Menu, School } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import DarkMode from "@/DarkMode";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";

const NavBar = () => {
  const user = true;
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 p-2.5 ">
      <div
        id="xyz"
        className="max-w-7xl mx-auto hidden md:flex items-center justify-between "
      >
        <div className="flex items-center gap-5">
          <School size={30} />
          <h1 className=" hidden md:block font-extrabold text-2xl">SKILLORA</h1>
        </div>
        <div className="flex gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link to="myLearning">My Learning</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="profile">Edit Profile</Link></DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem><Link to="/">Dashboard</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant={"outline"}>Login</Button>
              <Button>SignUp</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className=" font-extrabold text-xl">SKILLORA</h1>

        <MobileNavBar />
      </div>
    </div>
  );
};

export default NavBar;

const MobileNavBar = () => {
  const role = "instructor";
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-gray-200 hover:bg-gray-200 "
            variant="outline"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="p-3 flex flex-col ">
          <SheetHeader className="flex flex-row items-center justify-between mt-10 p-0">
            <SheetTitle>SKILLORA</SheetTitle>
            <DarkMode />
          </SheetHeader>
          <Separator className="mr-2" />
          <nav className="flex flex-col space-y-4">
            <span>My Learning</span>
            <span>Edit Profile</span>
            <p>Logout</p>
          </nav>
          {role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

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
import React, { useEffect } from "react";
import DarkMode from "@/DarkMode";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogOutMutation } from "@/features/apis/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [logout, { data, isSuccess, error, isError }] = useLogOutMutation();

  const logOutHandler = async () => {
    await logout();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg || "Logout Successfully");
      navigate("/login");
    }
    if (isError) {
      console.log(error);
    }
  }, [data, isSuccess, isError, error]);
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
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="myLearning">My Learning</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="profile">Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logOutHandler}>
                  Log out
                </DropdownMenuItem>

                {user.role === "instructor" ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  ""
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant={"outline"}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                SignUp
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className=" font-extrabold text-xl">SKILLORA</h1>

        <MobileNavBar user={user} />
      </div>
    </div>
  );
};

export default NavBar;

const MobileNavBar = ({ user }) => {
  const navigate = useNavigate();
  const [logout, { data, isSuccess, isError, error }] = useLogOutMutation();

  const logOutHandler = async () => {
    await logout();
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg || "Logout Successfully");
      navigate("/login");
    }
  }, [data, isSuccess, isError, navigate, error]);

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
            <span>
              <Link to="myLearning">My Learning</Link>
            </span>
            <span>
              <Link to="profile">Edit Profile</Link>
            </span>
            <span onClick={logOutHandler}>Logout</span>
          </nav>
          {user?.role === 'insructor' ? (
            <>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Dashboard</Button>
                </SheetClose>
              </SheetFooter>
            </>
          ) : ''}

        </SheetContent>
      </Sheet>
    </>
  );
};

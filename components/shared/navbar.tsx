import Image from "next/image";
import {LibraryBig, LogOut, Settings, User} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavigationBar() {
  return (
    <header className="flex items-center h-16 px-4 border-b gap-4 lg:gap-8 w-full">
      <Link
        className="hidden lg:flex items-center gap-2 text-lg font-semibold"
        href="#">
        <LibraryBig />
        LMS
      </Link>
      <div className="flex-1 min-w-0">
        <nav className="flex items-center h-full gap-4 lg:gap-8">
          <Link
            className=" lg:flex items-center gap-2 text-sm font-medium [&:hover]:underline"
            href="/dashboard">
            Trang chủ
          </Link>
          <Link
            className=" lg:flex items-center gap-2 text-sm font-medium [&:hover]:underline"
            href="/product">
            Sách
          </Link>
          <Link
            className=" lg:flex items-center gap-2 text-sm font-medium [&:hover]:underline"
            href="/author">
            Tác giả
          </Link>
          <Link
            className=" lg:flex items-center gap-2 text-sm font-medium [&:hover]:underline"
            href="/publisher">
            Nhà xuất bản
          </Link>
          <Link
            className=" lg:flex items-center gap-2 text-sm font-medium [&:hover]:underline"
            href="/category">
            Thể loại sách
          </Link>
          <Link
            className=" lg:flex items-center gap-2 text-sm font-medium [&:hover]:underline"
            href="/bookaholic">
            Độc giả
          </Link>
          <Link
            className=" lg:flex items-center gap-2 text-sm font-medium [&:hover]:underline"
            href="/employee">
            Nhân viên
          </Link>
          <Link
            className=" lg:flex items-center gap-2 text-sm font-medium [&:hover]:underline"
            href="/checkout">
            Mượn sách
          </Link>
        </nav>
      </div>
      <div>
        <div className="flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant={"ghost"}>
                  <User />
                  Hồ sơ
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Button variant={"ghost"}>
                  <LogOut />
                  Đăng xuất
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

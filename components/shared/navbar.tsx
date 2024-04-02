"use client";
import Image from "next/image";
import {LibraryBig, Link2, LogOut, Settings, User} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {LogOutButton} from "./logout-button";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";

export default function NavigationBar() {
  const session = useSession();
  const user = session?.data?.user;
  const role = user?.role;
  const pathname = usePathname();
  return (
    <header className="flex items-center h-16 px-4 border-b gap-4 lg:gap-8 w-full">
      <Link
        className="hidden lg:flex items-center gap-2 text-lg font-semibold"
        href="#">
        <LibraryBig />
        LMS
      </Link>
      <div className="flex-1 min-w-0">
        <nav className="flex items-start h-full lg:gap-2">
          <Button
            asChild
            variant={pathname === "/dashboard" ? "default" : "outline"}>
            <Link href="/dashboard">Tổng Quan</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/products" ? "default" : "outline"}>
            <Link href="/products">Sách</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/authors" ? "default" : "outline"}>
            <Link href="/authors">Tác giả</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/publishers" ? "default" : "outline"}>
            <Link href="/publishers">Nhà xuất bản</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/categories" ? "default" : "outline"}>
            <Link href="/categories">Thể loại</Link>
          </Button>

          <Button
            asChild
            variant={pathname === "/checkouts" ? "default" : "outline"}>
            <Link href="/checkouts">Mượn sách</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/bookaholics" ? "default" : "outline"}>
            <Link href="/bookaholics">Độc giả</Link>
          </Button>

          {role === "admin" && (
            <Button
              asChild
              variant={pathname === "/employees" ? "default" : "outline"}>
              <Link href="/employees">Nhân viên</Link>
            </Button>
          )}
        </nav>
      </div>
      <div>
        <div className="flex gap-x-4 items-center p-2 rounded-full bg-gray-200">
          <span className="italic">Xin chào, {user?.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback className="bg-sky-500">
                  <p className="text-white">
                    {user?.name.charAt(0).toUpperCase()}
                  </p>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={"/profile"}>
                  <Button variant={"ghost"}>
                    <User />
                    Hồ sơ
                  </Button>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <LogOutButton>Đăng xuất</LogOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

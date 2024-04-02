"use client";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Label} from "../ui/label";
import {Employee} from "@/types";
import EditProfileDialog from "@/components/dialog/profile-edit";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ChangePasswordDialog from "@/components/dialog/password-dialog";

export function ProfileContent(params: {user: Employee}) {
  const router = useRouter();
  const user = params.user;
  return (
    <div className="w-full py-6 mx-4">
      <Button className="w-1/6" onClick={() => router.back()}>
        Quay lại
      </Button>
      {/* <div className="rounded-sm b py-4 container rounded-lgshadow-lg items-start gap-6">
        <div className="flex flex-col gap-4 items-center">
          <h1
            className="text-3xl font-semibold text-center text-blue-700
            bg-blue-100 p-2 rounded-md">
            THÔNG TIN NGƯỜI DÙNG
          </h1>
          <Label className="text-lg">Tên người dùng: {user.fullName}</Label>
          <Label className="text-lg">
            Ngày sinh: {new Date(user.birthDate).toLocaleDateString("vi-VN")}
          </Label>
          <Label className="text-lg">Số điện thoại: {user.phoneNumber}</Label>
          <Label className="text-lg">
            Tên tài khoản đăng nhập: {user.account.username}
          </Label>
          
        </div>
      </div> */}
      <Card className="w-full max-w-3xl p-4 mx-auto">
        <CardHeader className="bg-gray-200 rounded-sm">
          <p className="text-3xl font-semibold">Thông tin người dùng</p>
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-sky-500">
                <p className="text-white">
                  {user.fullName.charAt(0).toUpperCase()}
                </p>
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <CardTitle className="text-base font-bold">
                {user.fullName}
              </CardTitle>
              <CardDescription className="text-sm">
                {user.phoneNumber}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên tài khoản</Label>
              <Input
                id="username"
                readOnly
                value={user.account && user.account.username}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Ngày sinh</Label>
              <Input
                id="dob"
                readOnly
                value={new Date(user.birthDate).toLocaleDateString("vi-VN")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Họ và Tên</Label>
              <Input id="name" readOnly value="Alex Lane" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" readOnly value={user.phoneNumber} />
            </div>
          </div>
        </CardContent>
        <div className="flex justify-between">
          <ChangePasswordDialog employee={user} />
          <EditProfileDialog employee={user} />
        </div>
      </Card>
    </div>
  );
}

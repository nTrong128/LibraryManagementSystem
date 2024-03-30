"use client";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Label} from "../ui/label";
import {Employee} from "@/types";
import EditProfileDialog from "../dialog/profile-edit";

export function ProfileContent(params: {user: Employee}) {
  const router = useRouter();
  const user = params.user;
  return (
    <div className="w-full py-6 mx-4">
      <Button className="w-1/6" onClick={() => router.back()}>
        Quay lại
      </Button>
      <div className="py-4 container rounded-lgshadow-lg items-start gap-6">
        <div className="flex flex-col gap-4 items-center">
          <h1
            className="text-3xl font-semibold text-center text-blue-700
            bg-blue-100 p-2 rounded-md">
            THÔNG TIN NGƯỜI DÙNG
          </h1>
          {/* USER SECTIOn */}
          <Label className="text-lg">Tên người dùng: {user.fullName}</Label>
          <Label className="text-lg">
            Ngày sinh: {new Date(user.birthDate).toLocaleDateString("vi-VN")}
          </Label>
          <Label className="text-lg">Số điện thoại: {user.phoneNumber}</Label>
          <Label className="text-lg">
            Tên tài khoản đăng nhập: {user.username}
          </Label>
          <EditProfileDialog employee={user} />
          <Button className="mx-auto bg-blue-600 hover:bg-blue-700">
            Đổi mật khẩu
          </Button>
        </div>
      </div>
    </div>
  );
}

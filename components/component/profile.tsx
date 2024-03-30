"use client";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Label} from "../ui/label";

export function ProfileContent(params: {user: any}) {
  const router = useRouter();
  const user = params.user;
  return (
    <div className="w-full py-6 mx-4">
      <Button onClick={() => router.back()}>Quay lại</Button>
      <div className="container rounded-lg grid shadow-lg items-start gap-6">
        <div className="flex flex-col gap-4">
          {/* USER SECTIOn */}
          <Label className="text-lg font-bold tracking-tighter">
            Tên người dùng: {user.name}
          </Label>
          <Label className="text-lg font-bold tracking-tighter">
            Tên người dùng: {user.name}
          </Label>
        </div>
        <div>{/* ACCOUNT SECTION */}</div>
      </div>
    </div>
  );
}

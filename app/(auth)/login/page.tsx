"use client";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useState, useTransition} from "react";

import {signIn} from "next-auth/react";
import {FormError} from "@/components/form/form-error";
import {useRouter} from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const session = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [isPendding, startTransition] = useTransition();
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };
    console.log(user);
    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          username: user.username,
          password: user.password,
          redirect: false,
          callbackUrl: "/dashboard",
        });
        if (!res?.error) {
          router.push("/dashboard");
        } else {
          setError("Tài khoản hoặc mật khẩu không đúng");
        }
      } catch (err: any) {}
    });
  };

  return (
    <main className="py-12 bg-gray-100 sm:px-6 lg:px-8 dark:bg-gray-800 h-screen">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl sm:leading-[3.5rem] md:text-6xl">
          ĐĂNG NHẬP
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Nhập tài khoản và mật khẩu để truy cập vào hệ thống
        </p>
      </div>
      <div className="max-w-2xl mx-auto gap-y-2">
        <form onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Tên tài khoản</Label>
            <Input name="username" placeholder="b2106819" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input name="password" type="password" placeholder="*******" />
          </div>
          <Button className="w-full my-2" type="submit" disabled={isPendding}>
            Đăng nhập
          </Button>
          <FormError message={error} />
        </form>
      </div>

      {/* QUÊN MẬT KHẨU VÀ TẠO TÀI KHOẢN  */}
      <div className="space-y-2 text-center">
        <Link className="text-sm underline" href="#">
          Quên mật khẩu?
        </Link>
        <p className="text-sm">
          Chưa có tài khoản?
          <Link className="underline" href={"/register"}>
            Đăng ký
          </Link>
        </p>
      </div>
    </main>
  );
}

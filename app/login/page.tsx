import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="py-12 bg-gray-100 sm:px-6 lg:px-8 dark:bg-gray-800 h-screen">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl sm:leading-[3.5rem] md:text-6xl">
            Welcome to the Library
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email and password to access your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Link href="/dashboard">
            <Button className="w-full">Login</Button>
          </Link>
        </div>
        <div className="space-y-2 text-center">
          <Link className="text-sm underline" href="#">
            Forgot your password?
          </Link>
          <p className="text-sm">
            Don&apos;t have an account?
            <Link className="underline" href="#">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

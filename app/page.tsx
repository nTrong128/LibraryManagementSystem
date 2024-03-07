import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import {JSX, SVGProps} from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link className="flex items-center justify-center" href="#">
          <span className="text-5xl font-bold text-[#FBA834]">Library MS</span>
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="font-medium hover:underline underline-offset-4"
            href="#">
            About
          </Link>
          <Link
            className=" font-medium hover:underline underline-offset-4"
            href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 xl:pt-36">
          <div className="container px-4 flex flex-col items-center gap-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Library Management System
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We have everything that you need, mate!
              </p>
            </div>
            <div className="space-x-4">
              <Link className="" href="login">
                <Button size={"lg"} className="text-lg">
                  ĐĂNG NHẬP
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Features
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Let your team focus on shipping features instead of managing
                infrastructure with automated CI/CD.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  Infinite scalability, zero config
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enable code to run on-demand without needing to manage your
                  own infrastructure or upgrade hardware.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  Real-time insights and controls
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get granular, first-party, real-user metrics on site
                  performance per deployment.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  Personalization at the edge
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Deliver dynamic, personalized content, while ensuring users
                  only see the best version of your site.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  Real-time insights and controls
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get granular, first-party, real-user metrics on site
                  performance per deployment.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  Personalization at the edge
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Deliver dynamic, personalized content, while ensuring users
                  only see the best version of your site.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">
                  Infinite scalability, zero config
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enable code to run on-demand without needing to manage your
                  own infrastructure or upgrade hardware.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Experience the workflow the best frontend teams love.
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Let your team focus on shipping features instead of managing
                infrastructure with automated CI/CD.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sign up to get notified when we launch.
                <Link className="underline underline-offset-2" href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

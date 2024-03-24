"use client";

import {signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";

interface LogOutButtonProps {
  children?: React.ReactNode;
}

export const LogOutButton = ({children}: LogOutButtonProps) => {
  const onclick = () => {
    signOut({callbackUrl: "/login"});
  };

  return (
    <Button variant={"ghost"} onClick={onclick} className="cursor-pointer">
      <LogOut />
      {children}
    </Button>
  );
};

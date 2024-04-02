"use server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
export default async function Layout({
  user,
  user_admin,
}: {
  user: React.ReactNode;
  user_admin: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;
  return <>{role === "admin" ? user_admin : user}</>;
}

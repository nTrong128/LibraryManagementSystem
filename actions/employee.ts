"use server";
import action from "@/actions/action";
import {authOptions} from "@/auth";
import {getServerSession} from "next-auth";

export async function deleteEmployee(id: number) {
  const session = await getServerSession(authOptions);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );
  action("list-employees");
  return data.json();
}

"use server";
import action from "@/actions/action";
import {authOptions} from "@/auth";
import {getServerSession} from "next-auth";

export async function ChangeStatusAccount(id: number, status: boolean) {
  const session = await getServerSession(authOptions);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${id}/accounts/toggle`,
    {
      body: JSON.stringify({
        enabled: status,
      }),
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  action("list-employees");
  return data.json();
}

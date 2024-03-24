"use server";
import action from "@/actions/action";
import {authOptions} from "@/auth";
import {getServerSession} from "next-auth";

export async function deleteProduct(id: number) {
  const session = await getServerSession(authOptions);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );
  action("list-books");
  return data.json();
}

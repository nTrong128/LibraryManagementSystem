"use server";
import action from "@/actions/action";
import {authOptions} from "@/auth";
import {getServerSession} from "next-auth/next";

export async function deleteLibraryCard(id: number) {
  const session = await getServerSession(authOptions);

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/readers/${id}/library-cards/`,

    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );
  action("list-readers");
  return data.json();
}

"use server";
import action from "@/actions/action";
import {authOptions} from "@/auth";
import {getServerSession} from "next-auth";
export async function getAuthors() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/authors`);
  return data.json();
}

export async function deleteAuthor(id: number) {
  const session = await getServerSession(authOptions);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/authors/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );
  action("list-authors");
  return data.json();
}

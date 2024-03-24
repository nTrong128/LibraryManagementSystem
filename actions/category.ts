"use server";
import action from "@/actions/action";
import {authOptions} from "@/auth";
import {getServerSession} from "next-auth";

export async function getCategories() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
  return data.json();
}

export async function DeleteCategory(id: number) {
  const session = await getServerSession(authOptions);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );
  action("list-categories");
  return data.json();
}

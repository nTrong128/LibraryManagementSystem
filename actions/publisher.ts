"use server";

import {authOptions} from "@/auth";
import {getServerSession} from "next-auth";
import action from "@/actions/action";

export async function getPublishers() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/publishers`);
  return data.json();
}

export async function deletePublisher(id: number) {
  const session = await getServerSession(authOptions);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/publishers/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    }
  );
  action("list-publishers");
  return data.json();
}

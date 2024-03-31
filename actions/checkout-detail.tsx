"use server";

import action from "@/actions/action";
import {authOptions} from "@/auth";
import {getServerSession} from "next-auth";

export async function ReturnBook(params: {checkoutId: string; bookId: string}) {
  const session = await getServerSession(authOptions);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkouts/${params.checkoutId}/details/${params.bookId}`,
    {
      body: JSON.stringify({returned: true}),
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
        "content-type": "application/json",
      },
    }
  );
  action("list-employees");
  return data.json();
}

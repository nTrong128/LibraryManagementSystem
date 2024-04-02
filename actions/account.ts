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

export async function resetPassword(id: number) {
  const session = await getServerSession(authOptions);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${id}/accounts/password-reset`,
    {
      body: JSON.stringify({
        newPassword: "Staff123@",
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

export async function changeRole(id: number, role: string) {
  const session = await getServerSession(authOptions);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${id}/accounts/role`,
    {
      body: JSON.stringify({
        role: role,
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

export async function deleteAccount(id: number) {
  const session = await getServerSession(authOptions);
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${id}/accounts`,
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

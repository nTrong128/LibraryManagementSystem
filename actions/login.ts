import {signIn} from "next-auth/react";
import AuthError from "next-auth";

export async function login(username: string, password: string) {
  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error) {
        case "CredentialsSignin":
          return {error: "Thông tin đăng nhập không hợp lệ!!"};
        default:
          return {error: "Something went wrong!!"};
      }
    }
    throw error;
  }
  return {success: "Đăng nhập thành công."};
}

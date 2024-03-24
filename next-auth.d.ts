import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      username: string;
      role: string;
      enabled: boolean;
      accessToken: string;
    };
  }
}

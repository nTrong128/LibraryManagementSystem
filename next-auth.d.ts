import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userId: string;
      name: string;
      email: string;
      image: string;
      username: string;
      role: string;
      enabled: boolean;
      loginTime: number;
      accessToken: string;
    };
  }
}

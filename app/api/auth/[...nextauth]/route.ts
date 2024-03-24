import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {redirect} from "next/navigation";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type: "text", placeholder: "jsmith"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8080/api/v1/auths/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // If you need to send authorization headers
            Authorization:
              "Basic " +
              btoa(credentials?.username + ":" + credentials?.password),
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        // if (res.status === 401 || res.status === 400) {
        //   return {error: "Tài khoản hoặc mật khẩu không đúng"};
        // }

        const resData = await res.json();
        const accountInfo = resData.data.accountInfo;

        const token = resData.data.token;

        let user = null;
        if (accountInfo) {
          user = {
            name: accountInfo.employee.fullName,
            email: "email",
            image: "image",
            id: accountInfo.id,
            username: accountInfo.username,
            role: accountInfo.role,
            enabled: accountInfo.enabled,
            accessToken: resData.data.token,
          };
        }

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}: {token: any; user: any}) {
      return {...token, ...user};
    },
    async session({session, token}: {session: any; token: any}) {
      session.user = token;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export {handler as POST, handler as GET};

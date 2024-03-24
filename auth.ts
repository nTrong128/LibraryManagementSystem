export const authOptions = {
  callbacks: {
    async jwt({token, user}: {token: any; user: any}) {
      return {...token, ...user};
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      session.user = token as any;

      return session;
    },
  },
};

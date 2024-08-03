import NextAuth from "next-auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) {
          return false;
        }
        const userDb = await db.user.findFirst({
          where: {
            username: email,
          },
        });

        if (userDb) {
          return true;
        }

        await db.user.create({
          data: {
            username: email,
            password: "Google",
            solWallet: {
              create: {
                publicKey: "",
                privateKey: "",
              },
            },
            inrWallet: {
              create: {
                balance: 0,
              },
            },
          },
        });
      }
    },
  },
});
export { handler as GET, handler as POST };

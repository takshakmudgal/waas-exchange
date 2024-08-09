import GoogleProvider from "next-auth/providers/google";
import prisma from "~/app/db";
import { Keypair } from "@solana/web3.js";
import type { Session, Profile, Account, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
    uid: string;
  };
}

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    session: ({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): CustomSession => {
      const newSession = session as CustomSession;
      if (newSession.user && token.uid) {
        newSession.user.uid = token.uid as string;
      }
      return newSession;
    },
    async jwt({
      token,
      account,
    }: {
      token: JWT;
      account: Account | null;
    }): Promise<JWT> {
      const user = await prisma.user.findFirst({
        where: {
          sub: account?.providerAccountId ?? "",
        },
      });
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
    }): Promise<boolean> {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) {
          return false;
        }

        const userDb = await prisma.user.findFirst({
          where: {
            username: email,
          },
        });

        if (userDb) {
          return true;
        }

        const keypair = Keypair.generate();
        const publicKey = keypair.publicKey.toBase58();
        const privateKey = keypair.secretKey;

        await prisma.user.create({
          data: {
            username: email,
            name: profile?.name ?? "",
            profilePicture: profile?.image ?? "",
            provider: "Google",
            sub: account.providerAccountId ?? "",
            solWallet: {
              create: {
                publicKey: publicKey,
                privateKey: privateKey.toString(),
              },
            },
            inrWallet: {
              create: {
                balance: 0,
              },
            },
          },
        });

        return true;
      }

      return false;
    },
  },
};

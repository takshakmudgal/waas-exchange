import { DashboardCard } from "../components/DashboardCard";
import prisma from "../db";
import { authConfig } from "../lib/auth";
import { getServerSession } from "next-auth";

async function getUserWallet() {
  const session = await getServerSession(authConfig);

  const userWallet = await prisma.solWallet.findFirst({
    where: {
      userId: session?.user?.uid,
    },
    select: {
      publicKey: true,
    },
  });

  if (!userWallet) {
    return {
      error: "No solana wallet found associated to the user",
    };
  }

  return { error: null, userWallet };
}

export default async function DashboardPage() {
  const userWallet = await getUserWallet();
  if (userWallet.error ?? !userWallet.userWallet?.publicKey) {
    return <>No solana wallet found</>;
  }
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-96 start-1/2 flex -translate-x-1/2 transform"
      >
        <div className="h-[44rem] w-[35rem] -translate-x-[10rem] rotate-[-60deg] transform bg-gradient-to-r from-violet-400 to-purple-100 blur-3xl"></div>
        <div className="rounded-fulls h-[50rem] w-[60rem] origin-top-left -translate-x-[15rem] -rotate-12 bg-gradient-to-tl from-blue-400 via-blue-100 to-blue-50 blur-3xl"></div>
      </div>
      <div className="my-32">
        <DashboardCard publicKey={userWallet.userWallet?.publicKey} />
      </div>
    </div>
  );
}

"use client";
import { useSession } from "next-auth/react";
import { Greeting } from "./Greeting";
import { useRouter } from "next/navigation";

export const DashboardCard = ({ publicKey }: { publicKey: string }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return (
      <div className="z-5 relative inset-0 flex items-center justify-center">
        <div className="flex h-[70vh] max-h-[45rem] w-[90vw] max-w-[65rem] items-center justify-center rounded-lg bg-gray-100 shadow-2xl shadow-purple-400">
          <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transform">
            <div className="animate-spin rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-blue-400 p-4">
              <div className="rounded-full bg-white">
                <div className="h-24 w-24 rounded-full"></div>
              </div>
            </div>
          </div>
          ;
        </div>
      </div>
    );
  }

  if (!session.data?.user) {
    router.push("/");
    return null;
  }

  return (
    <div className="z-5 relative flex justify-center">
      <div className="h-[70vh] max-h-[45rem] w-[90vw] max-w-[65rem] rounded-lg bg-white px-6 py-6 shadow-2xl shadow-purple-400">
        <Greeting
          image={session.data?.user?.image ?? ""}
          name={session.data?.user?.name ?? ""}
        />
        <Assets publicKey={publicKey} />
      </div>
    </div>
  );
};

function Assets({ publicKey }: { publicKey: string }) {
  return <div className="mt-4 text-slate-500">Account assets</div>;
}
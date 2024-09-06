"use client";
import { useSession } from "next-auth/react";
import { Greeting } from "./Greeting";
import { useRouter } from "next/navigation";
import { SecondaryButton } from "./Button";
import { useCopyStatus } from "~/hooks/useCopyStatus";
import { FaRegCopy } from "react-icons/fa6";

export const DashboardCard = ({ publicKey }: { publicKey: string }) => {
  const { status, setCopySuccess, setCopyError } = useCopyStatus();
  const session = useSession();
  const router = useRouter();

  const handleAddressCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicKey);
      setCopySuccess("Address copied!");
    } catch (err) {
      setCopyError("Failed to copy address.");
    }
  };

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
  const buttonText =
    status.type === "idle" ? (
      <span className="flex items-center gap-1.5">
        Your Wallet Address <FaRegCopy />
      </span>
    ) : (
      status.message
    );

  return (
    <div className="z-5 relative flex justify-center">
      <div className="h-[70vh] max-h-[45rem] w-[90vw] max-w-[65rem] rounded-lg bg-white px-6 py-6 shadow-2xl shadow-purple-400">
        <div className="relative z-20">
          <Greeting
            image={session.data?.user?.image ?? ""}
            name={session.data?.user?.name ?? ""}
          />
        </div>
        <Assets publicKey={publicKey} />
        <div className="flex justify-end">
          <SecondaryButton onClick={handleAddressCopy}>
            {buttonText}
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

function Assets({ publicKey }: { publicKey: string }) {
  return <div className="mt-4 text-slate-500">WaaS Account assets</div>;
}

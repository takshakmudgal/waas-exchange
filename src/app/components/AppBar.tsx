"use client";
import { signOut, useSession, signIn } from "next-auth/react";
import { PrimaryButton } from "./Button";
import Image from "next/image";
import Link from "next/link";

export const AppBar = () => {
  const session = useSession();
  return (
    <>
      <div className="flex flex-row items-center justify-between px-[4%] py-4 sm:px-12">
        <Link href={"#"} className="flex items-center gap-2">
          <Image
            src="/waas-exchange.jpg"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full duration-700 hover:rotate-[360deg] hover:scale-125"
          />
          <span className="flex text-lg font-semibold text-gray-800 sm:text-4xl">
            WaaS Exchange
          </span>
        </Link>
        {session.data?.user ? (
          <PrimaryButton
            onClick={async () => {
              await signOut();
            }}
          >
            Log Out
          </PrimaryButton>
        ) : (
          <PrimaryButton
            onClick={async () => {
              await signIn();
            }}
          >
            Log In
          </PrimaryButton>
        )}
      </div>
    </>
  );
};

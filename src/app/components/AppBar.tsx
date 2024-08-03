"use client";
import { signOut, useSession, signIn } from "next-auth/react";
import { PrimaryButton } from "./Button";

export const AppBar = () => {
  const session = useSession();
  return (
    <>
      <div className="flex flex-row items-center justify-between px-[4%] py-4 sm:px-12">
        <span className="text-2xl font-semibold text-gray-800 sm:text-4xl">
          WaaS Exchange
        </span>
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

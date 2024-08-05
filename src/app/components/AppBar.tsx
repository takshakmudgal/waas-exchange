"use client";
import { signOut, useSession, signIn } from "next-auth/react";
import { PrimaryButton } from "./Button";
import Image from "next/image";
import Link from "next/link";

export const AppBar = () => {
  const session = useSession();

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ease-in-out`}
    >
      <div
        className={`flex flex-row items-center justify-between px-[4%] py-4 transition-all duration-300 ease-in-out sm:px-12`}
      >
        <Link href={"/"} className="group flex items-center gap-3">
          <div className="relative overflow-hidden rounded-full">
            <Image
              src="/waas-exchange.jpg"
              alt="logo"
              width={50}
              height={50}
              className="transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>
          </div>
          <span className="text-lg font-semibold text-gray-800 transition-all duration-300 group-hover:text-blue-600 sm:text-3xl">
            WaaS Exchange
          </span>
        </Link>
        <div className="flex items-center space-x-4">
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
      </div>
    </nav>
  );
};

"use client";
import { signIn, useSession } from "next-auth/react";
import { PrimaryButton, SecondaryButton } from "./Button";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

export const Hero = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-96 start-1/2 flex -translate-x-1/2 transform"
      >
        <div className="h-[44rem] w-[35rem] -translate-x-[10rem] rotate-[-60deg] transform bg-gradient-to-r from-violet-400 to-purple-100 blur-3xl"></div>
        <div className="rounded-fulls h-[50rem] w-[60rem] origin-top-left -translate-x-[15rem] -rotate-12 bg-gradient-to-tl from-blue-400 via-blue-100 to-blue-50 blur-3xl"></div>
      </div>

      <div className="relative z-10 mt-36">
        <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-block bg-gradient-to-l from-blue-600 to-violet-500 bg-clip-text text-sm font-medium text-transparent">
              Revolutionizing the Way of Holding and Exchanging Tokens & Assets
            </p>

            <div className="mt-5">
              <h1 className="block text-4xl font-semibold text-gray-800 md:text-5xl lg:text-6xl">
                Building a Trusted & Futurestic
              </h1>
              <h2 className="inline-block bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-4xl font-semibold text-transparent md:text-5xl lg:text-6xl">
                Centeralized Exchange
              </h2>
            </div>
            <div className="mt-5 text-pretty">
              <p className="text-sm text-gray-600 sm:text-lg">
                <Link href="#" className="font-semibold underline">
                  WaaS Exchange
                </Link>{" "}
                is a cutting-edge, built in with Spots, modern and fast
                centralised exchange which also uses some aspects of
                Decentralization for complete security and signing checks.
              </p>
            </div>
            <div className="mt-8">
              {session.data?.user ? (
                <PrimaryButton
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Get Started
                </PrimaryButton>
              ) : (
                <SecondaryButton
                  onClick={async () => {
                    await signIn("google");
                  }}
                >
                  <FaGoogle className="mr-2 scale-125" />
                  Login with Google
                </SecondaryButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

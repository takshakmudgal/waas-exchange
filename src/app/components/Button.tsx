import React from "react";
import { z } from "zod";
import Spinner from "./Spinner";

const PrimaryButtonSchema = z.object({
  children: z.custom<React.ReactNode>(),
  onClick: z.function().returns(z.void().or(z.promise(z.void()))),
  isLoading: z.boolean().optional().default(false),
});

const SecondaryButtonSchema = z.object({
  children: z.custom<React.ReactNode>(),
  onClick: z.function().returns(z.void().or(z.promise(z.void()))),
});

type SecondaryButtonProps = z.infer<typeof SecondaryButtonSchema>;
type PrimaryButtonProps = z.infer<typeof PrimaryButtonSchema>;

export const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  const { children, onClick, isLoading } = PrimaryButtonSchema.parse(props);

  return (
    <button
      onClick={onClick}
      type="button"
      className="group relative z-20 inline-block text-sm sm:text-lg"
      disabled={isLoading}
    >
      <span className="relative z-20 block overflow-hidden rounded-full border-2 border-blue-600/70 px-2.5 py-3.5 font-semibold leading-tight text-gray-800 transition-colors duration-300 ease-out group-hover:text-white sm:px-5 sm:py-3">
        <span className="absolute inset-0 h-full w-full rounded-full bg-gray-50 px-5 py-3"></span>
        <span className="ease absolute left-0 -ml-2 h-48 w-48 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-blue-600/70 transition-all duration-300 group-hover:-rotate-180"></span>
        <span className="relative flex items-center justify-center">
          {isLoading ? <Spinner size={24} color="#1E40AF" /> : children}
        </span>
      </span>
      <span
        className="absolute bottom-0 right-0 -mb-1 -mr-1 h-12 w-full rounded-full bg-blue-600/70 transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0"
        data-rounded="rounded-full"
      ></span>
    </button>
  );
};

export const SecondaryButton: React.FC<SecondaryButtonProps> = (props) => {
  const { children, onClick } = SecondaryButtonSchema.parse(props);

  return (
    <button
      onClick={onClick}
      type="button"
      className="relative z-20 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      {children}
    </button>
  );
};

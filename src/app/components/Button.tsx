export const PrimaryButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className="group relative inline-block text-lg"
      >
        <span className="relative z-10 block overflow-hidden rounded-full border-2 border-blue-600/70 px-3 py-2.5 font-semibold leading-tight text-gray-800 transition-colors duration-300 ease-out group-hover:text-white sm:px-5 sm:py-3">
          <span className="absolute inset-0 h-full w-full rounded-full bg-gray-50 px-3 py-2.5 sm:px-5 sm:py-3"></span>
          <span className="ease absolute left-0 -ml-2 h-48 w-48 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-blue-600/70 transition-all duration-300 group-hover:-rotate-180"></span>
          <span className="relative">{children}</span>
        </span>
        <span
          className="absolute bottom-0 right-0 -mb-1 -mr-1 h-12 w-full rounded-full bg-blue-600/70 transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0"
          data-rounded="rounded-full"
        ></span>
      </button>
    </>
  );
};

export const SecondaryButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className="animate-shimmer inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        {children}
      </button>
    </>
  );
};

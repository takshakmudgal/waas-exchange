import Image from "next/image";

export const Greeting = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Image
        src={image}
        alt={`Profile picture of ${name}`}
        width={64}
        height={64}
        className="h-12 w-12 border-spacing-2 rounded-full border-2 border-purple-400 sm:h-16 sm:w-16 sm:border-4"
      />
      <div className="text-pretty text-lg font-semibold sm:text-3xl">
        <span>Welcome back, {name}! </span>
      </div>
    </div>
  );
};

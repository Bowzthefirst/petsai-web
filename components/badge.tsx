import React from "react";
import Image from "next/image";

export const Badge: React.FC<
  { children: React.ReactNode } & React.ComponentPropsWithoutRef<"button">
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-neutral-50 dark:bg-neutral-700 no-underline group cursor-pointer relative md:shadow-2xl shadow-zinc-900 rounded-full p-px text-sm sm:text-base font-semibold leading-6  text-neutral-700 dark:text-neutral-300 inline-block w-fit mx-auto"
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full  opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative flex space-x-3 items-center z-10 rounded-full bg-neutral-100 dark:bg-neutral-800 py-2 px-5 ring-1 ring-white/10 ">
        <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/logos/y_combinator_.png"
            alt="Y Combinator"
            width={20}
            height={20}
            className="w-full h-full object-cover"
          />
        </div>
        <span>{children}</span>
        {/* <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/logos/a16z-speedrun.jpeg"
            alt="A16Z"
            width={60}
            height={60}
            className="w-full h-full object-cover"
          />
        </div> */}
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-neutral-400/0 via-neutral-400/90 to-neutral-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </button>
  );
};

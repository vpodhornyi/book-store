import Link from "next/link";
import React from "react";
import { ErrorAnimation } from "../ui/errorAnimation";
import { GitHubIcon } from "../ui/icons";
import { IconContainer } from "../ui/iconContainer";

interface ErrorLayoutProps {
  title: string;
  description: string;
}

export default function ErrorLayout({ title, description }: ErrorLayoutProps) {
  return (
    <div className="pl-2 pr-2 pb-25.5 flex flex-col items-center max-w-117.5 mx-auto">
      <ErrorAnimation />

      <div className="">
        <h1 className="text-center font-unica text-2xl mb-3.75">
          {title}
        </h1>
        <div className="text-center font-syne text-[16px] mb-5.25">
          {description}
        </div>
        <div className="mb-8">
          <Link
            href="/"
            className="
      font-syne text-[20px] text-center
      block w-full               
      py-4 px-6                 
      bg-yellow-500 text-black 
      rounded-lg                
      border-2 border-gray-800  
      transition-transform active:scale-[0.98] 
    "
          >
            Go back to Home
          </Link>
        </div>
        <div className="flex gap-5.5 text-sm items-center">
          <IconContainer>
            <GitHubIcon className="md:h-6 md:w-6" />
          </IconContainer>
          <p className="text-gray-600">
            You are Dev? If yes, you can register one issue on github, if you
            want contribe to this project.
          </p>
        </div>
      </div>
    </div>
  );
}

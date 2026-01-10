import React from "react";

interface IconContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const IconContainer = ({ className, children }: IconContainerProps) => {
  return (
    <div className={`
      flex items-center justify-center 
      rounded-full border-2 border-gray-800 dark:border-gray-100 
      h-10 w-10 md:h-12 md:w-12 shrink-0 
      bg-white dark:bg-gray-950 
      shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] 
      transition-all duration-300
      hover:text-blue-500 hover:border-blue-500 hover:shadow-blue-500/50
      ${className}
    `}>
      {children}
    </div>
  );
};
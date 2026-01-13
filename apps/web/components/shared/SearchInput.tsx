import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  placeholder?: string;
}

export const SearchInput = ({
  value,
   onChange,
  className,
  placeholder = "Type the name of book or author...",
}: SearchInputProps) => {
  return (
    <div className={`relative w-full max-w-[650px] group ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full py-4 pr-5 pl-5
          font-syne text-[14px] text-gray-800
          bg-gray-100 
          border-[3px] border-gray-800 
          rounded-full
          shadow-[8px_8px_0px_0px_#FFC107]
          outline-none
          transition-all
          focus:translate-x-[2px] focus:translate-y-[2px]
          focus:shadow-[3px_3px_0px_0px_#FFC107]
          placeholder:text-gray-400
          placeholder:text-[14px]
          dark:bg-gray-500
          dark:text-gray-100
          dark:placeholder:text-gray-100
        "
      />
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.875 16.75C13.2242 16.75 16.75 13.2242 16.75 8.875C16.75 4.52576 13.2242 1 8.875 1C4.52576 1 1 4.52576 1 8.875C1 13.2242 4.52576 16.75 8.875 16.75Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.4437 14.4437L19 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

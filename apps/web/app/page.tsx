"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen p-10 transition-colors duration-500 bg-white dark:bg-gray-950 flex flex-col items-center justify-center">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-6 right-6 flex h-8 w-8 items-center justify-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl"
        aria-label="Toggle theme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-600 dark:text-gray-400"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" />
          <path d="M6.34 17.66l-1.41 1.41" /><path d="M19.07 4.93l-1.41 1.41" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-600 dark:text-gray-400"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>
      <div className="max-w-md bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring-1 shadow-xl ring-gray-900/5 transition-all">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 p-2 shadow-lg mb-6">
           <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
           </svg> 
        </div>
        <h3 className="text-gray-900 dark:text-white text-base font-medium tracking-tight">
          Book_store
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, eum.
        </p>
      </div>
    </div>
  );
}
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { SunIcon, MoonIcon } from "../ui/icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-8 w-8" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-lg hover:text-blue-500 transition-colors"
    >
      <SunIcon 
        className="h-4.5 w-4.5 md:h-6 md:w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-gray-100 hover:text-blue-500" 
      />
      <MoonIcon 
        className="absolute h-4.5 w-4.5 md:h-6 md:w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-gray-100 hover:text-blue-500" 
      />
    </button>
  );  
}
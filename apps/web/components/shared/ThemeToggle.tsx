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
      className="relative flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <SunIcon 
        className="h-6.25 w-6.25 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:text-gray-400" 
      />
      <MoonIcon 
        className="absolute h-6.25 w-6.25 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-gray-100" 
      />
    </button>
  );  
}
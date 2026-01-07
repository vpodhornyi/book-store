"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Додаємо клас на рівні <html>
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, [isDark]);

  return (
    <div className="min-h-screen p-10 transition-colors duration-500 bg-white text-black dark:bg-deep-black dark:text-pure-white">
      <button
        onClick={() => setIsDark(!isDark)}
        className="mb-10 px-6 py-2 border border-black dark:border-white rounded-full transition-all"
      >
        Змінити тему на {isDark ? "Світлу" : "Чорну"}
      </button>

      <div className="p-8 rounded-2xl bg-gray-100 dark:bg-neutral-900 border dark:border-neutral-800">
        <h1 className="text-3xl font-bold">Tailwind v4 Працює!</h1>
        <p className="mt-2 opacity-70">
          Якщо фон став чорним — ми перемогли конфігурацію v4.
        </p>
      </div>
    </div>
  );
}
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 transition-colors dark:bg-gray-950">
      <div className="text-center">
        <h1 className="font-unica text-[12rem] leading-none text-indigo-600/20 dark:text-indigo-500/10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
          404
        </h1>

        <div className="relative z-10">
          <h2 className="font-unica text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Сторінку не знайдено
          </h2>
          <p className="font-syne mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
            Вибачте, ми не змогли знайти сторінку, яку ви шукаєте. Можливо, вона
            була перенесена або видалена.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="font-syne rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all active:scale-95"
            >
              На головну
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

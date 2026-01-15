"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function ModalShell({
                             title,
                             children,
                           }: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const close = () => router.back();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={close}
    >
      <div
        className="w-full max-w-md rounded-xl bg-neutral-950 p-6 text-white shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button className="rounded px-2 py-1 hover:bg-white/10" onClick={close}>
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

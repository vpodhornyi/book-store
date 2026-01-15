"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ModalShell } from "@/components/overlay/ModalShell";
import LoginForm from "./login-form";

export default function LoginModalPage() {
  const router = useRouter();

  return (
    <ModalShell title="Login">
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4"
        onMouseDown={() => router.back()}
      >
        <div
          className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="dark:text-gray-100 text-2xl font-semibold text-gray-800">Login</h2>

            <button
              type="button"
              onClick={() => router.back()}
              className="dark:text-gray-100 rounded-lg px-2 py-1 text-black/70 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-gray-100"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <LoginForm />

          <div className="dark:text-gray-300 mt-5 text-center text-sm text-black/60">
            Don’t have an account?{" "}
            <Link href="/register" className="dark:text-gray-100 font-semibold text-black underline underline-offset-4">
              Register
            </Link>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
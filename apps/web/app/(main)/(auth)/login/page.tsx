"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import LoginForm from "./login-form";

export default function LoginModalPage() {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-center"
      onMouseDown={() => router.back()}
    >
      <div
        className="w-full max-w-md  p-6"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="dark:text-gray-100 text-2xl font-semibold text-gray-800">Login</h2>
        </div>

        <LoginForm/>

        <div className="dark:text-gray-300 mt-5 text-center text-sm text-black/60">
          Don’t have an account?{" "}
          <Link href="/register" className="dark:text-gray-100 font-semibold text-black underline underline-offset-4">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
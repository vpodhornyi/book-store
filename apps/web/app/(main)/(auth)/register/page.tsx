"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import RegisterForm from "./register-form";

export default function LoginModalPage() {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-center"
      onMouseDown={() => router.back()}
    >
      <div
        className="w-full max-w-md p-6"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="dark:text-gray-100 text-2xl font-semibold text-gray-800">Register</h2>
        </div>

        <RegisterForm/>

        <div className="dark:text-gray-300 mt-5 text-center text-sm text-black/60">
          Have an account?{" "}
          <Link href="/login" className="dark:text-gray-100 font-semibold text-black underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
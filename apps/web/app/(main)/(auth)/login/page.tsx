import Link from "next/link";

import LoginForm from "./login-form";

export default function LoginModalPage() {

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md  p-6">
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
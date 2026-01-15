"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginRequestSchema, type LoginRequest } from "@repo/contracts";

import { authService } from "@/auth/auth.service";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/shared/button";

export default function LoginForm() {
  const router = useRouter();
  const { setUser, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const disabled = submitting || isLoading;

  const hideError = () => setTimeout(() => setError(null), 5000);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: LoginRequest = { email, password };

    const parsed = LoginRequestSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues.map((i) => i.message).join(", "));
      hideError();
      return;
    }

    setSubmitting(true);
    try {
      const res = await authService.login(parsed.data);
      setUser(res.user);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      hideError();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-2">
        <span className="dark:text-gray-300 text-sm font-medium text-black/80">Email</span>
        <input
          className=" dark:placeholder:text-gray-100 dark:bg-gray-500 h-11 rounded-xl border border-black/15 bg-white px-4 text-black outline-none transition focus:border-black/30 focus:ring-4 focus:ring-orange-500/30 disabled:opacity-60"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          placeholder="test@example.com"
          disabled={disabled}
        />
      </label>

      <label className="grid gap-2">
        <span className="dark:text-gray-300 text-sm font-medium text-black/80">Password</span>
        <input
          className=" dark:placeholder:text-gray-100 dark:bg-gray-500 dark:text-gray-100 h-11 rounded-xl border border-black/15 bg-white px-4 text-black outline-none transition focus:border-black/30 focus:ring-4 focus:ring-orange-500/30 disabled:opacity-60"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          disabled={disabled}
        />
      </label>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      <Button
        disabled={disabled}
        submitting={submitting}
        className="group relative mt-1 h-11 rounded-xl border border-black/20 bg-yellow-500 font-semibold text-black transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
      >Sign in</Button>

      <div className="dark:text-gray-300 text-center text-xs text-black/50">
        Tip: use your test account credentials
      </div>
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="h-10 w-64 rounded-xl bg-black/5 dark:bg-white/10" />
        <div className="mt-6 h-36 rounded-2xl border border-black/10 bg-white dark:bg-gray-900 dark:border-white/10" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-gray-100">
            My profile
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage your account and session.
          </p>
        </div>

        <button
          type="button"
          onClick={async () => {
            await logout();
            router.replace("/");
          }}
          className="border-2 justify-center rounded-[10px] border-gray-800 text-gray-800 py-2 bg-yellow-500 hover:bg-orange-500 md:w-28 md:shrink-0"
        >
          Logout
        </button>
      </div>

      {/* Card */}
      <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gray-900">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-gray-400">
              Account
            </div>
            <div className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
              {user.email}
            </div>
          </div>

          {/* маленький бейдж в стиле макета */}
          <div className="rounded-xl border border-black/10 bg-black/5 px-3 py-2 text-xs text-gray-700 dark:border-white/10 dark:bg-white/10 dark:text-gray-200">
            Signed in
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <InfoRow label="User ID" value={(user as any).id ?? "—"} />
          <InfoRow label="Name" value={(user as any).name ?? "—"} />
          <InfoRow
            label="Roles"
            value={Array.isArray((user as any).roles) ? (user as any).roles.join(", ") : "—"}
          />
          <InfoRow label="Status" value="Active" />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 p-4 dark:border-white/10">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
        {value}
      </div>
    </div>
  );
}

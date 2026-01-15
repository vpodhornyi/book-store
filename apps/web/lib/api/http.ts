import { authStore } from "@/auth/auth.store";

type ApiFetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
  skipAuthRefresh?: boolean;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";

let refreshPromise: Promise<string | null> | null = null;

function buildUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

async function readJson(res: Response): Promise<any> {
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(buildUrl("/auth/refresh"), {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return null;

        const data = await readJson(res);
        const token = data?.accessToken ?? null;

        if (token) authStore.setAccessToken(token);
        else authStore.clearAuth();

        return token;
      } catch {
        authStore.clearAuth();
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

export async function apiFetch(path: string, options: ApiFetchOptions = {}) {
  const url = buildUrl(path);

  const headers: Record<string, string> = { ...(options.headers ?? {}) };
  if (options.body && !headers["Content-Type"]) headers["Content-Type"] = "application/json";

  const token = authStore.getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const doRequest = () =>
    fetch(url, { ...options, headers, credentials: "include" });

  let response = await doRequest();

  if (response.status === 401 && !options.skipAuthRefresh) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers.Authorization = `Bearer ${newToken}`;
      response = await doRequest();
    }
  }

  const data = await readJson(response);
  return { data, response };
}

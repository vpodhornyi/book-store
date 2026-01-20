import {
  RegisterRequestSchema,
  LoginRequestSchema,
  AuthResponseSchema,
  RefreshResponseSchema,
  type RegisterRequest,
  type LoginRequest,
  type UserResponse,
  type AuthResponse,
  type RefreshResponse,
  UserResponseSchema,
  apiErrorMessage
} from "@repo/contracts";

import { apiFetch } from "@/lib/api/http";
import { authStore } from "@/auth/auth.store";

export const authService = {
  async register(payload: RegisterRequest) {
    const body = RegisterRequestSchema.parse(payload);

    const { data, response } = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
      skipAuthRefresh: true,
    });

    if (!response.ok) throw new Error("Register failed");

    const parsed = AuthResponseSchema.parse(data);

    authStore.setAccessToken(parsed.accessToken);
    authStore.setUser(parsed.user);

    return parsed;
  },

  async login(payload: LoginRequest): Promise<AuthResponse> {
    const body: LoginRequest = LoginRequestSchema.parse(payload);

    const { data, response } = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
      skipAuthRefresh: true,
    });

    if (!response.ok) throw new Error(apiErrorMessage(data));
    const parsed: AuthResponse = AuthResponseSchema.parse(data);

    authStore.setAccessToken(parsed.accessToken);
    authStore.setUser(parsed.user);
    return parsed;
  },

  async refresh(): Promise<string | null> {
    const { data, response } = await apiFetch("/auth/refresh", {
      method: "POST",
      skipAuthRefresh: true,
    });

    if (!response.ok) return null;

    const parsed: RefreshResponse = RefreshResponseSchema.parse(data);
    authStore.setAccessToken(parsed.accessToken);
    return parsed.accessToken;
  },

  async me(): Promise<UserResponse | null> {
    const { data, response } = await apiFetch("/auth/me", { method: "GET" });
    if (!response.ok) return null;

    const user: UserResponse = UserResponseSchema.parse(data);
    authStore.setUser(user);
    return user;
  },

  async logout() {
    await apiFetch("/auth/logout", { method: "POST", skipAuthRefresh: true });
    authStore.clearAuth();
  },
};

import type { UserResponse } from "@repo/contracts";

type AuthState = {
  accessToken: string | null;
  user: UserResponse | null;
};
const state: AuthState = { accessToken: null, user: null };

export const authStore = {
  getAccessToken: () => state.accessToken,
  setAccessToken: (token: string | null): string | null => (state.accessToken = token),
  getUser: (): UserResponse | null => state.user,
  setUser: (user: UserResponse | null): UserResponse | null => (state.user = user),
  clearAuth: () => {
    state.accessToken = null;
    state.user = null;
  },
};

"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { UserResponse } from "@repo/contracts";
import { authStore } from "@/auth/auth.store";
import { authService } from "@/auth/auth.service";

type AuthContextValue = {
  user: UserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserResponse | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserResponse | null>(authStore.getUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setUser = useCallback((u: UserResponse | null) => {
    authStore.setUser(u);
    setUserState(u);
  }, []);

  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const token: string | null = await authService.refresh();

      if (!token) {
        authStore.clearAuth();
        setUser(null);
        return;
      }

      const me = await authService.me();
      if (!me) {
        authStore.clearAuth();
        setUser(null);
        return;
      }

      setUser(me);
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, [setUser]);

  useEffect(() => {
    const cachedUser: UserResponse | null = authStore.getUser();
    if (cachedUser) {
      setUser(cachedUser);
      setIsLoading(false);
      return;
    }
    void refreshSession();
  }, [refreshSession, setUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      refreshSession,
      logout,
      setUser,
    }),
    [user, isLoading, refreshSession, logout, setUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
}

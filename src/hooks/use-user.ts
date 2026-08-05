"use client";

import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { logoutAction } from "@/app/[locale]/(main)/auth/_actions/logout";
import { meAction } from "@/app/[locale]/(main)/auth/_actions/me";
import { useUserStore, type User } from "@/stores/user";

export const SESSION_QUERY_KEY = ["session"] as const;

export async function fetchSession(): Promise<User> {
  const result = await meAction();
  if ("success" in result) return result.user;
  throw new Error(result.error);
}

export function useUser() {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isLoading = useUserStore((state) => state.isLoading);
  const clearUser = useUserStore((state) => state.clearUser);
  const queryClient = useQueryClient();

  const fetchUser = useCallback(async () => {
    await queryClient.refetchQueries({ queryKey: SESSION_QUERY_KEY });
  }, [queryClient]);

  const logout = useCallback(async () => {
    try {
      clearUser();
      queryClient.removeQueries({ queryKey: SESSION_QUERY_KEY });
      await logoutAction();
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }, [clearUser, queryClient]);

  return {
    user,
    isAuthenticated,
    isLoading,
    fetchUser,
    logout,
  };
}

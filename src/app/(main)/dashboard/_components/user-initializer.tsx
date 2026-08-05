"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { fetchSession, SESSION_QUERY_KEY } from "@/hooks/use-user";
import { useUserStore } from "@/stores/user";

export function UserInitializer() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const setLoading = useUserStore((state) => state.setLoading);
  const router = useRouter();

  const query = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: fetchSession,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setLoading(query.isLoading);
  }, [query.isLoading, setLoading]);

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  useEffect(() => {
    if (!query.isError) return;

    clearUser();
    if (
      query.error instanceof Error &&
      query.error.message === "Unauthenticated"
    ) {
      router.push("/auth/login");
    }
  }, [query.isError, query.error, clearUser, router]);

  return null;
}

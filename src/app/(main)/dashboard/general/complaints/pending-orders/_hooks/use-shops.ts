"use client";

import { useQuery } from "@tanstack/react-query";

import { getShops } from "../_api/get-shops";

export function useShops() {
  const query = useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

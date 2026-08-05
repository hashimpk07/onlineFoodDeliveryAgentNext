"use client";

import { useQuery } from "@tanstack/react-query";

import { getCaptains } from "../_api/get-captains";

export function useCaptains() {
  const query = useQuery({
    queryKey: ["captains"],
    queryFn: getCaptains,
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

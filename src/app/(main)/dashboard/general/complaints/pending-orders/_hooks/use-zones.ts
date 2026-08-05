"use client";

import { useQuery } from "@tanstack/react-query";

import { getZones } from "../_api/get-zones";

export function useZones() {
  const query = useQuery({
    queryKey: ["zones"],
    queryFn: getZones,
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

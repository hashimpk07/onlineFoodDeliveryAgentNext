"use client";

import { useQuery } from "@tanstack/react-query";

import { getSendableTypeData } from "../_api/get-sendable-type-data";

export function useSendableTypeData(sendableClass: string | null) {
  const query = useQuery({
    queryKey: ["sendable-type-data", sendableClass],
    queryFn: () => getSendableTypeData(sendableClass as string),
    enabled: !!sendableClass,
    staleTime: 60_000,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}

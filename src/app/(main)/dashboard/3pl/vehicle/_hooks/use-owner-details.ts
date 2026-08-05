"use client";

import { useQuery } from "@tanstack/react-query";

import { getOwnerDetailsApi } from "../_api/get-owner-details-api";

export function useOwnerDetails(ownerId: string | number | null) {
  return useQuery({
    queryKey: ["owner-details", ownerId],
    queryFn: () => getOwnerDetailsApi(ownerId),
    enabled: !!ownerId,
  });
}

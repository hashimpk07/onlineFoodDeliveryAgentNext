"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchCaptainData } from "../_api/get-reconciliation-captain-api";

export function useReconciliationList() {
  return useQuery({
    queryKey: ["captain"],
    queryFn: fetchCaptainData,
    select: (data) =>
      data.map((captain) => ({
        label: captain.name,
        value: String(captain.id),
      })),
  });
}

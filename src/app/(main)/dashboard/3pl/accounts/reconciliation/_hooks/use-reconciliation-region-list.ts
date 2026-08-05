"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchRegionData } from "../_api/get-reconciliation-region-api";

export function useRegionList() {
  return useQuery<Array<{ label: string; value: string }>>({
    queryKey: ["region"],
    queryFn: async () => {
      const data = await fetchRegionData();
      return data.map((region) => ({
        label: String(region.name),
        value: String(region.id),
      }));
    },
  });
}

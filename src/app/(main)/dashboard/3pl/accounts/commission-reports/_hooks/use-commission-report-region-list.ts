"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchRegionData } from "../_api/get-region-api";

export function useCommissionReportRegionList() {
  return useQuery({
    queryKey: ["region"],
    queryFn: fetchRegionData,
    select: (data) =>
      data.map((region) => ({
        label: region.name,
        value: String(region.id),
      })),
  });
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchAreaData } from "../_api/get-captain-commission-area-api";

export function useCaptainCommissionAreaList() {
  return useQuery({
    queryKey: ["area"],
    queryFn: fetchAreaData,
    select: (data) =>
      data.map((area) => ({
        label: area.name,
        value: String(area.id),
      })),
  });
}

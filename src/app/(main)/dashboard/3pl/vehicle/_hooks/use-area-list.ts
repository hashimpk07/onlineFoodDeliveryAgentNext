"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchAreaData } from "../_api/get-area-api";

export function useAreaList() {
  return useQuery({
    queryKey: ["areas"],
    queryFn: fetchAreaData,
    select: (data) =>
      data.map((area) => ({
        label: area.name,
        value: String(area.id),
      })),
  });
}

"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchCaptainData } from "../_api/get-captain-apis";

export function useCaptainList() {
  return useQuery({
    queryKey: ["captains"],
    queryFn: fetchCaptainData,
    select: (data) =>
      data.map((captain) => ({
        label: captain.name,
        value: String(captain.id),
      })),
  });
}

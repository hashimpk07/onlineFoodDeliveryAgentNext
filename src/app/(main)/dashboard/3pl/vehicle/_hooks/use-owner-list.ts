"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchOwnerData } from "../_api/get-owner-api";

export function useOwnersList() {
  return useQuery({
    queryKey: ["owners"],
    queryFn: fetchOwnerData,
    select: (data) =>
      data.map((owners) => ({
        label: owners.name,
        value: String(owners.id),
      })),
  });
}

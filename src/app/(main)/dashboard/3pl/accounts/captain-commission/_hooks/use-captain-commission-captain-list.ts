"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchClientData } from "../_api/get-captain-commission-captain-api";

export function useCaptainCommissionCaptainList() {
  return useQuery({
    queryKey: ["captain"],
    queryFn: fetchClientData,
    select: (data) =>
      data.map((Captain) => ({
        label: Captain.name,
        value: String(Captain.id),
      })),
  });
}

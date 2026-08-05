"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchClientData } from "../_api/get-company-earning-client-api";

export function useCompanyEarningClientList() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClientData,
    select: (data) =>
      data.map((client) => ({
        label: client.name,
        value: String(client.id),
      })),
  });
}

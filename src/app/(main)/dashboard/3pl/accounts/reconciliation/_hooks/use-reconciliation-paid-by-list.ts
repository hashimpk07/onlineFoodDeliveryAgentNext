"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchPaidByData } from "../_api/get-reconciliation-paid-by-api";

export function usePaymentByList() {
  return useQuery<Array<{ label: string; value: string }>>({
    queryKey: ["paid_by"],
    queryFn: async () => {
      const data = await fetchPaidByData();
      return data.map((payment) => ({
        label: String(payment.name),
        value: String(payment.id),
      }));
    },
  });
}

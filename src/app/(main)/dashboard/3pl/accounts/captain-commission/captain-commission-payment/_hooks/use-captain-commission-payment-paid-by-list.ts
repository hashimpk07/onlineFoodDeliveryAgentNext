"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchPaidByData } from "../_api/get-captain-commission-payment-paid-by-api";

export function usePaymentByList(companyId?: number) {
  return useQuery<Array<{ label: string; value: string }>>({
    queryKey: ["paid_by", companyId],
    enabled: !!companyId,
    queryFn: async () => {
      const data = await fetchPaidByData(companyId);
      return data.map((payment) => ({
        label: String(payment.name),
        value: String(payment.id),
      }));
    },
  });
}

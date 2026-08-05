"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchPaymentTypeData } from "../_api/get-captain-commission-payments-payment-type-api";

export function usePaymentTypeList() {
  return useQuery<Array<{ label: string; value: string }>>({
    queryKey: ["payment-list"],
    queryFn: async () => {
      const data = await fetchPaymentTypeData();
      return data.map((payment) => ({
        label: String(payment.name),
        value: String(payment.id),
      }));
    },
  });
}

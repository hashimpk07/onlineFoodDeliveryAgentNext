"use client";

import { useQuery } from "@tanstack/react-query";

import { getOrderPayment } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_api/update-payment-details";

export function useOrderPayment(orderId: string | null) {
  return useQuery({
    queryKey: ["order-payment", orderId],
    queryFn: () => getOrderPayment(orderId),
    enabled: !!orderId, // Only run query if orderId exists
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

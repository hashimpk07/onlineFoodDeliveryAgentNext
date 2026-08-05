"use client";

import { useQuery } from "@tanstack/react-query";

import { getMonthlyOrderStatusAction } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_api/get-monthly-order-status";

import { MonthlyData } from "../_types/client-dashboard";

export function useMonthlyOrderStatus() {
  return useQuery<MonthlyData[]>({
    queryKey: ["client-order-status-monthly"],
    queryFn: async () => {
      const res = await getMonthlyOrderStatusAction();
      if (res.status === "error") {
        throw new Error(res.message);
      }
      return res.data;
    },
    staleTime: 60_000,
  });
}

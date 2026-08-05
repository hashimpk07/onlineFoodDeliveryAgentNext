"use client";

import { useQuery } from "@tanstack/react-query";

import orderStatusGraphAction from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_api/order-status-graph";

import { OrderStatusGraphItem } from "../_types/client-dashboard";

export function useOrderStatusGraph() {
  return useQuery<OrderStatusGraphItem[]>({
    queryKey: ["client-order-status-graph"],
    queryFn: async () => {
      const res = await orderStatusGraphAction();
      if (res.status === "error") throw new Error(res.message);
      return res.data;
    },
    staleTime: 60 * 1000,
  });
}

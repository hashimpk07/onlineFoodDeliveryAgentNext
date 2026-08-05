"use client";

import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Order } from "@/app/[locale]/(main)/dashboard/3pl/order/_types/api";
import { getEchoInstance } from "@/lib/pusher";

type NewOrderPayload = {
  order: Order;
};

export function use3plRealtimeOrders(
  queryKey: readonly unknown[],
  companyId: number | undefined,
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!companyId) return;

    let echo;
    try {
      echo = getEchoInstance();
    } catch {
      return;
    }
    const channel = echo.private(`orders.3pl.${companyId}`);

    channel
      .subscribed(() => {
        console.log("Subscribed");
      })
      .error((err: any) => {
        console.log(" Error:", err);
      })
      .listen("CaptainOrderAssigned", (data: NewOrderPayload) => {
        const newOrder = data.order;

        //  Update React Query cache
        queryClient.setQueryData(queryKey, (oldData: any) => {
          if (!oldData) return oldData;

          // Avoid duplicate insertion
          const exists = oldData.orders.some(
            (order: Order) => order.id === newOrder.id,
          );

          if (exists) return oldData;

          return {
            ...oldData,
            orders: [newOrder, ...oldData.orders], // Add to top
            pagination: {
              ...oldData.pagination,
              total: oldData.pagination.total + 1,
            },
          };
        });
      });

    return () => {
      echo.leave(`orders.3pl.${companyId}`);
    };
  }, [queryClient, queryKey, companyId]);
}

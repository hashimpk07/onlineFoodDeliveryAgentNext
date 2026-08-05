"use client";

import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Order } from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { useUser } from "@/hooks/use-user";
import { getEchoInstance } from "@/lib/pusher";

type NewOrderPayload = {
  order: Order;
};

export function useRealtimeOrders(queryKey: readonly unknown[]) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const clientId = user?.employee_client_id;

  useEffect(() => {
    if (!user || !clientId) return;

    let echo;
    try {
      echo = getEchoInstance();
    } catch {
      return;
    }
    const channel = echo.private(`orders.client.${clientId}`);

    channel
      .subscribed(() => {
        console.log("Subscribed");
      })
      .error((err: any) => {
        console.log(" Error:", err);
      })
      .listen("NewOrder", (data: NewOrderPayload) => {
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
      echo.leave(`orders.client.${clientId}`);
    };
  }, [user, queryClient, queryKey]);
}

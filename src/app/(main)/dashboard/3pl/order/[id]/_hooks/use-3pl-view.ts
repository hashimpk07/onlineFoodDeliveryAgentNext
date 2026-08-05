"use client";

import { useQuery } from "@tanstack/react-query";

import {
  ordersClientView,
  ordersDirections,
} from "@/app/[locale]/(main)/dashboard/3pl/order/[id]/_api/3pl-orderview";
import { DirectionResponse } from "@/app/[locale]/(main)/dashboard/3pl/order/[id]/_components/delivery-map/types";
import { OrderDetailsResponse } from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";

export function useOrders3plView(id: string) {
  const query = useQuery<OrderDetailsResponse>({
    queryKey: ["order-view-3pl", id],
    queryFn: () => ordersClientView(id),
    enabled: !!id,
    throwOnError: true,
  });

  const order_map = useQuery<DirectionResponse>({
    queryKey: ["order-view-3pl-map", id],
    queryFn: () => ordersDirections(id),
    enabled: !!id,
    throwOnError: true,
  });

  return {
    viewData: query.data,
    viewLoading: query.isLoading,
    viewError: query.isError,
    order_map: order_map.data,
  };
}

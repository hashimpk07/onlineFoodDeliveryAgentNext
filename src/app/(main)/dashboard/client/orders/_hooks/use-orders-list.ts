/* eslint-disable */

"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  orderShopData,
  ordersShopData,
  orderStatusCardData,
  orderStatusData,
  orderTabledatas,
} from "@/app/[locale]/(main)/dashboard/client/orders/_api/get-orders";
import { useOrdersUrlParams } from "@/app/[locale]/(main)/dashboard/client/orders/_hooks/use-orders-params";
import { useRealtimeOrders } from "@/app/[locale]/(main)/dashboard/client/orders/_hooks/use-realtime-orders";
import {
  ClientsShopsResponse,
  OrdersApiResponse,
  OrdersSummaryCardsProps,
  ShopsData,
  Status,
} from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";

export function useOrdersLists() {
  const { filters, page, pageSize } = useOrdersUrlParams();
  // CRITICAL
  const ordersKey = ["order", filters, page, pageSize] as const;
  const ordersQuery = useQuery<OrdersApiResponse>({
    queryKey: ordersKey,
    queryFn: async () => {
      const res = await orderTabledatas({
        ...filters,
        page,
        pageSize,
      });
      return res;
    },
    placeholderData: keepPreviousData,
    staleTime: 0,
  });

  useRealtimeOrders(ordersKey);

  //  NON-CRITICAL
  const shopsQuery = useQuery<ShopsData>({
    queryKey: ["order-shops"],
    queryFn: orderShopData,
  });

  const statusQuery = useQuery<Status[]>({
    queryKey: ["order-status"],
    queryFn: orderStatusData,
  });

  const clientShopsQuery = useQuery<ClientsShopsResponse>({
    queryKey: ["shop-data"],
    queryFn: ordersShopData,
  });

  const statusCardQuery = useQuery<OrdersSummaryCardsProps>({
    queryKey: ["order-status-card"],
    queryFn: orderStatusCardData,
  });

  return {
    /* ---------------- DATA ---------------- */

    // critical data
    order: ordersQuery.data?.orders ?? [],
    pagination: ordersQuery.data?.pagination,
    isLoading: ordersQuery?.isFetching || ordersQuery.isLoading,

    // optional data
    shops: shopsQuery.data?.shops,
    status: statusQuery.data ?? [],
    statusCard: statusCardQuery.data,

    clientshopQuery: clientShopsQuery.data,
    // clientQuery: clientQuery.data,
    clientShopsQuery: clientShopsQuery.data,

    /* ---------------- LOADING ---------------- */

    loadingOrders: ordersQuery.isFetching,
    loadingFilters:
      shopsQuery.isLoading ||
      statusQuery.isLoading ||
      clientShopsQuery.isLoading,
    loadingStatusCards: statusCardQuery.isLoading || statusCardQuery.isFetching,

    /* ---------------- ERRORS ---------------- */

    // hard error
    ordersError: ordersQuery.isError ? ordersQuery.error : null,

    // soft errors
    filterErrors: {
      shops: shopsQuery.isError ? shopsQuery.error : null,
      status: statusQuery.isError ? statusQuery.error : null,
      clientShops: clientShopsQuery.isError ? clientShopsQuery.error : null,
      statusCard: statusCardQuery.isError ? statusCardQuery.error : null,
    },
  };
}

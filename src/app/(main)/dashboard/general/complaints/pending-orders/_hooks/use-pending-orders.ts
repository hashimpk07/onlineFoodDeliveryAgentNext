/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getPendingOrders } from "../_api/get-pending-orders";

import { usePendingOrdersParams } from "./use-pending-orders-params";

export default function usePendingOrdersList() {
  const { page, pageSize, zone, fromDate, toDate, captain, q, shop_name } =
    usePendingOrdersParams();

  const query = useQuery({
    queryKey: [
      "pending-orders",
      page,
      pageSize,
      zone,
      fromDate,
      toDate,
      captain,
      q,
      shop_name,
    ],
    queryFn: () =>
      getPendingOrders({
        page,
        per_page: pageSize,
        zone,
        from_date: fromDate,
        to_date: toDate,
        captain,
        request_orderID: q,
        shop_name,
      }),
    placeholderData: keepPreviousData,
    staleTime: 0,
  });

  return {
    data: query.data?.data?.orders ?? [],
    pagination: query.data?.data?.pagination ?? {
      current_page: page,
      from: 0,
      last_page: 1,
      per_page: pageSize,
      to: 0,
      total: 0,
    },
    isLoading: query.isLoading || query.isFetching,
    error: query.error,
  };
}

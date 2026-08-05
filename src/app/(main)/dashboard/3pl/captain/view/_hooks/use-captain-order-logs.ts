"use client";
import { useQuery } from "@tanstack/react-query";

import { CaptainOrderLogs } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_api/get-captain-logs";
import { useCaptainDetailUrlParams } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-captain-details-params";
import { CaptainOrderHistoryResponse } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_types/api";

/* ───────────── Data fetching ───────────── */

export function useCaptainOrderLogs() {
  const {
    captain_id,
    orderPageSize,
    order_page,
    setOrderPage,
    setOrderPageSize,
  } = useCaptainDetailUrlParams();

  const { data, isLoading, isFetching, isError, error, refetch } =
    useQuery<CaptainOrderHistoryResponse>({
      queryKey: ["captain-order-logs", captain_id, order_page, orderPageSize],
      queryFn: () =>
        CaptainOrderLogs({
          captain_id: Number(captain_id),
          order_page,
          order_page_size: orderPageSize,
        }),
      enabled: !!captain_id,
    });

  return {
    orders: data?.orders,
    pagination: data?.pagination,

    isLoading,
    isFetching,
    isError,
    error,

    order_page,
    orderPageSize,

    setOrderPage,
    setOrderPageSize,
    refetch,
  };
}

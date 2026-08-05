"use client";

import { useEffect } from "react";

import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  fetchCaptainData,
  fetchOrderReportsData,
  fetchOrderStatusData,
} from "@/app/[locale]/(main)/dashboard/client/order-report/_api/get-orders";
import { useOrderReportsUrlParams } from "@/app/[locale]/(main)/dashboard/client/order-report/_hooks/use-order-report-params";
import type {
  Captain,
  OrdersApiResponse,
  Status,
  Order,
} from "@/app/[locale]/(main)/dashboard/client/order-report/_types/order-report-type";

const ORDER_REPORT_STALE_TIME = 2 * 60 * 1000; // 2 minutes
const ORDER_REPORT_GC_TIME = 5 * 60 * 1000; // 5 minutes
const STATIC_DATA_STALE_TIME = 10 * 60 * 1000; // 10 minutes – captains/statuses rarely change

/* eslint-disable complexity */
export function useOrdersLists() {
  const { filters, page, pageSize, setPage, setPageSize } =
    useOrderReportsUrlParams();
  const queryClient = useQueryClient();

  //  Orders Report list
  const orderQuery = useQuery<OrdersApiResponse>({
    queryKey: ["order-report", filters, page, pageSize],
    queryFn: async () => {
      const res = await fetchOrderReportsData({
        ...filters,
        page,
        pageSize,
      });
      return res;
    },
    placeholderData: keepPreviousData,
    staleTime: ORDER_REPORT_STALE_TIME,
    gcTime: ORDER_REPORT_GC_TIME,
  });

  //  Captains dropdown values
  const captainsQuery = useQuery<Captain[]>({
    queryKey: ["order-report-captain"],
    queryFn: async () => {
      const res = await fetchCaptainData();
      return res;
    },
    staleTime: STATIC_DATA_STALE_TIME,
    gcTime: ORDER_REPORT_GC_TIME,
  });

  const statusQuery = useQuery<Status[]>({
    queryKey: ["order-report-status"],
    queryFn: async () => {
      const res = await fetchOrderStatusData();
      return res;
    },
    staleTime: STATIC_DATA_STALE_TIME,
    gcTime: ORDER_REPORT_GC_TIME,
  });

  // Prefetch the next page so pagination feels instant
  useEffect(() => {
    const totalPages = orderQuery.data?.reports?.pagination?.last_page ?? 0;
    if (page < totalPages) {
      void queryClient.prefetchQuery<OrdersApiResponse>({
        queryKey: ["order-report", filters, page + 1, pageSize],
        queryFn: () =>
          fetchOrderReportsData({ ...filters, page: page + 1, pageSize }),
        staleTime: ORDER_REPORT_STALE_TIME,
      });
    }
  }, [
    queryClient,
    filters,
    page,
    pageSize,
    orderQuery.data?.reports?.pagination?.last_page,
  ]);

  const rawOrders = orderQuery.data?.reports?.data ?? [];
  const mappedOrders = rawOrders.map((item: any): Order => {
    return {
      id: item.order_id,
      order_id: item.order_id,
      client_order_id: item.client_order_id,
      order_type: item.order_type,
      cod_amount: item.cod_amount,
      client_name: item.client_name,
      shop_name: item.shop_name,
      shop_zone: item.zone_name,
      shop_area: item.region_name,
      shop_region: item.quadrant_name,
      captain: item.captain_name,
      assigned_by: item.assigned_by,
      order_status: item.order_status_name,
      cancellation_reason: item.cancellation_reason,
      cancelled_by: item.cancelled_by,
      date: item.created_at,
      created_at: item.created_at_time,
      order_accepted_at: item.order_accepted_at,
      order_accepted_time: item.order_accepted_at_time,
      start_ride_at: item.start_ride_at,
      start_ride_time: item.start_ride_at_time,
      reached_shop_at: item.reached_shop_at,
      reached_shop_time: item.reached_shop_at_time,
      order_picked_at: item.order_picked_at,
      order_picked_time: item.order_picked_at_time,
      shipped_at: item.shipped_at,
      shipped_time: item.shipped_at_time,
      reached_dest_at: item.reached_dest_at,
      reached_dest_time: item.reached_dest_at_time,
      business_day: item.business_day,
      final_status_at: item.final_status_at,
      final_status_time: item.final_status_at_time,
      acceptance_time: item.acceptance_time,
      arrival_time: item.arrival_time,
      reached_time: item.reached_time_taken,
      picked_time: item.picked_time_taken,
      pickup_to_delivery_time: item.delivered_time_taken,
      process_time: item.total_time_taken,
      distance: item.distance,
    };
  });
  return {
    order: mappedOrders,
    pagination: orderQuery.data?.reports
      ? {
          total: orderQuery.data.reports.pagination?.total ?? 0,
          total_pages: orderQuery.data.reports.pagination?.last_page ?? 1,
        }
      : null,
    isLoading: orderQuery.isFetching || orderQuery.isLoading,

    loading:
      orderQuery.isLoading ||
      orderQuery.isFetching ||
      captainsQuery.isLoading ||
      statusQuery.isLoading,

    captains: captainsQuery.data ?? [],
    statuses: statusQuery.data ?? [],
    page,
    pageSize,
    setPage,
    setPageSize,
  };
}

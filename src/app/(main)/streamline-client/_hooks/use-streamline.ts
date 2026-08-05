/* eslint-disable */
"use no memo";
"use client";
import {
  StreamLineCaptains,
  StreamLineFilters,
  StreamLineOrdersCard,
} from "@/app/[locale]/(main)/streamline-client/_api/streamline-captains";
import {
  FILTER_CONFIG,
  MapStatusFilters,
  OrderListItem,
  StreamlineCaptain,
} from "@/app/[locale]/(main)/streamline-client/_lib/types";
import { useCursorPaginatedQuery } from "@/lib/streamline-cursor-pagination";
import { useQuery } from "@tanstack/react-query";
import { Package2 } from "lucide-react";
import {
  useCaptainsStreamlineParams,
  useOrdersStreamlineParams,
} from "./use-streamline-params";

export function useStreamline() {
  const { filters: orderFilters } = useOrdersStreamlineParams();
  const { filters: captainFilters } = useCaptainsStreamlineParams();

  const captainsQuery = useCursorPaginatedQuery<
    StreamlineCaptain,
    Parameters<typeof StreamLineCaptains>[0]
  >({
    queryKey: ["captains", captainFilters, orderFilters.order],
    filters: { ...captainFilters, order: orderFilters.order },
    queryFn: StreamLineCaptains,
  });

  const ordersQuery = useCursorPaginatedQuery<
    OrderListItem,
    Parameters<typeof StreamLineOrdersCard>[0]
  >({
    queryKey: ["orders", orderFilters],
    filters: orderFilters,
    queryFn: StreamLineOrdersCard,
  });

  const filtersQuery = useQuery<MapStatusFilters[]>({
    queryKey: ["filters"],
    queryFn: StreamLineFilters,
    select: (data) =>
      data.map((f) => ({
        ...f,
        ...(FILTER_CONFIG[f.label] ?? {
          icon: Package2,
          color: "text-gray-400",
        }),
      })),
  });

  const refetchAll = async () => {
    await Promise.all([
      captainsQuery.refetchFromStart(),
      ordersQuery.refetchFromStart(),
      filtersQuery.refetch(),
    ]);
  };

  return {
    captains: captainsQuery.items,
    orders: ordersQuery.items,
    hasNextCaptains: captainsQuery.hasNext,
    hasPrevCaptains: captainsQuery.hasPrev,
    hasNextOrders: ordersQuery.hasNext,
    hasPrevOrders: ordersQuery.hasPrev,
    goNextCaptainsPage: captainsQuery.goNext,
    goPrevCaptainsPage: captainsQuery.goPrev,
    goNextOrdersPage: ordersQuery.goNext,
    goPrevOrdersPage: ordersQuery.goPrev,
    isLoading: ordersQuery.isLoading || captainsQuery.isLoading,
    isFetching: ordersQuery.isFetching || captainsQuery.isFetching,
    isFetchingCaptainsPage: captainsQuery.isFetching,
    isFetchingOrdersPage: ordersQuery.isFetching,
    filters: filtersQuery.data,
    refetchAll,
  };
}

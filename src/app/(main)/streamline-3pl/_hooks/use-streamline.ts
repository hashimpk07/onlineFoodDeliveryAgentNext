"use client";
import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Package2 } from "lucide-react";

import {
  StreamLine3plCaptainDetails,
  StreamLine3plCaptains,
  StreamLine3plFilters,
  StreamLine3plOrders,
} from "@/app/[locale]/(main)/streamline-3pl/_api/streamline-captains";
import { use3plOrdersStreamlineParams } from "@/app/[locale]/(main)/streamline-3pl/_hooks/use-streamline-params";
import {
  CaptainDetailsDataResponse,
  FILTER_CONFIG,
  MapStatusFilters,
  OrderListItemResponse,
  StreamlineCaptain,
} from "@/app/[locale]/(main)/streamline-3pl/_lib/types";
import { useUser } from "@/hooks/use-user";
import { useCursorPaginatedQuery } from "@/lib/streamline-cursor-pagination";

export function use3plStreamline() {
  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;
  const { filters } = use3plOrdersStreamlineParams();

  const [captainDialog, setCaptainDialog] = useState<{
    open: boolean;
    id: string | null;
    name: string;
  }>({ open: false, id: null, name: "" });

  const openCaptainDialog = (id: string | number, name: string) =>
    setCaptainDialog({ open: true, id: String(id), name });

  const closeCaptainDialog = () =>
    setCaptainDialog({ open: false, id: null, name: "" });

  const captainFilters = useMemo(
    () => ({
      show: filters.show,
      search: filters.search,
      order: filters.order,
    }),
    [filters.show, filters.search, filters.order],
  );

  const orderFilters = useMemo(
    () => ({
      search: filters.order_search,
      status: filters.status,
    }),
    [filters.order_search, filters.status],
  );

  const captainsQuery = useCursorPaginatedQuery<
    StreamlineCaptain,
    Parameters<typeof StreamLine3plCaptains>[0]
  >({
    queryKey: ["3pl_captains", captainFilters, companyId],
    filters: {
      company: companyId,
      show: captainFilters.show,
      search: captainFilters.search,
    },
    queryFn: StreamLine3plCaptains,
    enabled: !!companyId,
  });

  const ordersQuery = useCursorPaginatedQuery<
    OrderListItemResponse,
    Parameters<typeof StreamLine3plOrders>[0]
  >({
    queryKey: ["3pl_orders", orderFilters, companyId],
    filters: {
      company_id_3pl: companyId,
      search: orderFilters.search,
      status: orderFilters.status,
    },
    queryFn: StreamLine3plOrders,
    enabled: !!companyId,
  });

  const filtersQuery = useQuery<MapStatusFilters[]>({
    queryKey: ["3pl-filters", companyId],
    queryFn: () => StreamLine3plFilters(companyId?.toString() ?? null),
    select: (data) =>
      data.map((f) => ({
        ...f,
        ...(FILTER_CONFIG[f.label] ?? {
          icon: Package2,
          color: "text-gray-400",
        }),
      })),
    enabled: !!companyId,
  });

  const captainDetailsQuery = useQuery<CaptainDetailsDataResponse>({
    queryKey: ["3pl-captain-details", captainDialog.id],
    queryFn: () => StreamLine3plCaptainDetails(captainDialog.id),
    enabled: captainDialog.open && captainDialog.id !== null,
    staleTime: 1000 * 30,
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
    isLoading: ordersQuery.isLoading,
    isFetching: ordersQuery.isFetching,
    isFetchingCaptainsPage: captainsQuery.isFetching,
    isFetchingOrdersPage: ordersQuery.isFetching,
    filters: filtersQuery.data,
    captainLoading: captainsQuery.isLoading || captainsQuery.isFetching,

    captainDialog,
    captainDetails: captainDetailsQuery.data ?? null,
    isCaptainDetailsLoading: captainDetailsQuery.isLoading,
    isCaptainDetailsError: captainDetailsQuery.isError,
    openCaptainDialog,
    closeCaptainDialog,
    refetchAll,
  };
}

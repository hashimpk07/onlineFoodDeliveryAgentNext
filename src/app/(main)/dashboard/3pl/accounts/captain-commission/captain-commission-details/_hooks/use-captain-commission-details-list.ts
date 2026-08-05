/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useQuery } from "@tanstack/react-query";

import { getCaptainCommissionDetailsApi } from "../_api/captain-commission-details";

import { useCaptainCommissionDetailsParams } from "./use-captain-commission-details-params";

import type { CaptainCommissionDetailsResponse } from "../_types/captain-commission-details-type";

export function useCaptainCommissionDetailsList(id: string) {
  const { filters, page, pageSize } = useCaptainCommissionDetailsParams();

  const detailsQuery = useQuery<CaptainCommissionDetailsResponse["data"]>({
    queryKey: ["captain-commission-details", id, filters, page, pageSize],
    queryFn: async () => {
      const res = await getCaptainCommissionDetailsApi(id, {
        page,
        per_page: pageSize,
        from_date: filters.fromDate,
        to_date: filters.toDate,
        q: filters.search,
        client: filters.client,
        shop: filters.shop,
        status: filters.status,
      });

      if (res.status === "error") {
        throw new Error(res.message);
      }

      return res.data;
    },
    keepPreviousData: true,
    staleTime: 0,
    gcTime: 0,
    enabled: Boolean(id),
    refetchOnWindowFocus: false,
  });

  return {
    capatian_commission: detailsQuery.data?.capatian_commission ?? [],
    counts: detailsQuery.data?.pagination?.total ?? null,
    pagination: detailsQuery.data?.pagination ?? null,
    isLoading: detailsQuery.isLoading || detailsQuery.isFetching,
    isFetching: detailsQuery.isFetching,
    isRefetching: detailsQuery.isRefetching,
    isError: detailsQuery.isError,
    error: detailsQuery.error,
    refetch: detailsQuery.refetch,
    page,
    pageSize,
  };
}

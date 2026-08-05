import { useQuery } from "@tanstack/react-query";

import { getCaptainCommissionDetailsCountApi } from "../_api/captain-commission-details";

import { useCaptainCommissionDetailsParams } from "./use-captain-commission-details-params";

import type { CaptainCommissionDetailsCountResponse } from "../_types/captain-commission-details-type";

export function useCaptainCommissionDetailsCountList(id: string) {
  const { filters } = useCaptainCommissionDetailsParams();

  const countQuery = useQuery<CaptainCommissionDetailsCountResponse["data"]>({
    queryKey: ["captain-commission-details", id, filters],
    queryFn: async () => {
      const res = await getCaptainCommissionDetailsCountApi(id, {
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
    staleTime: 0,
    enabled: !!id,
  });

  return {
    counts: countQuery.data ?? null,
    isLoading: countQuery.isFetching || countQuery.isLoading,
    loading: countQuery.isLoading || countQuery.isFetching,
  };
}

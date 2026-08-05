import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getCompanyEarningApi } from "../_api/company-earning";

import { useCompanyEarningParams } from "./use-company-earning-params";

import type { CompanyEarningApiResponse } from "../_types/company-earning-type";

export function useCompanyEarningList() {
  const { filters, page, pageSize } = useCompanyEarningParams();

  const commissionQuery = useQuery<CompanyEarningApiResponse["data"]>({
    queryKey: ["company-earning", filters, page, pageSize],
    queryFn: async () => {
      const res = await getCompanyEarningApi({
        client: filters.clientId,
        shop: filters.shopId,
        status: filters.status,
        from_date: filters.fromDate,
        to_date: filters.toDate,
        q: filters.search,
        page,
        per_page: pageSize,
      });
      if (res.status === "error") {
        throw new Error(res.message);
      }

      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 0,
  });

  return {
    commissions: commissionQuery.data?.data ?? [],
    pagination: commissionQuery.data?.pagination ?? null,
    counts: commissionQuery.data?.count ?? null,
    isLoading: commissionQuery.isFetching || commissionQuery.isLoading,
    loading: commissionQuery.isLoading || commissionQuery.isFetching,
    isRefetching: commissionQuery.isRefetching,
  };
}

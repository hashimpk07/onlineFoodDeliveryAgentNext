import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getReconciliationApi } from "../_api/reconciliation";

import { useReconciliationParams } from "./use-reconciliation-params";

import type { ReconciliationApiResponse } from "../_types/reconciliation-type";

export function useReconciliationList() {
  const { filters, page, pageSize } = useReconciliationParams();

  const commissionQuery = useQuery<ReconciliationApiResponse["data"]>({
    queryKey: ["company-earning", filters, page, pageSize],
    queryFn: async () => {
      const res = await getReconciliationApi({
        captain: filters.captain,
        paid_by: filters.paidBy,
        payment_type: filters.paymentType,
        from_date: filters.fromDate,
        to_date: filters.toDate,
        invoice_number: filters.search,
        region: filters.region,
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
    commissions: commissionQuery.data?.captain_commission_payment ?? [],
    pagination: commissionQuery.data?.pagination ?? null,
    isLoading: commissionQuery.isFetching || commissionQuery.isLoading,
    loading: commissionQuery.isLoading || commissionQuery.isFetching,
    isRefetching: commissionQuery.isRefetching,
  };
}

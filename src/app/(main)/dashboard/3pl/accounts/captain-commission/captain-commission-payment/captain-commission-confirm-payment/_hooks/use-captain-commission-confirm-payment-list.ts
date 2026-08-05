import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getCaptainCommissionConfirmPaymentListApi } from "../_api/captain-commission-confirm-payment";

import { useCaptainCommissionDetailsParams } from "./use-captain-commission-confirm-payment-params";

import type { CaptainCommissionConfirmPaymentResponse } from "../_types/captain-commission-confirm-payment-type";

export function useCaptainCommissionConfirmPaymentList() {
  const { filters, page, pageSize } = useCaptainCommissionDetailsParams();

  const query = useQuery<CaptainCommissionConfirmPaymentResponse["data"]>({
    queryKey: [
      "captain-commission-confirm-payment-list",
      filters,
      page,
      pageSize,
    ],

    queryFn: async () => {
      const res = await getCaptainCommissionConfirmPaymentListApi({
        page,
        per_page: pageSize,
        from_date: filters.fromDate,
        to_date: filters.toDate,
        captain: filters.captain,
        vehicle_type: filters.vehicleType,
        payment_status: filters.paymentStatus,
        status: filters.status,
        removed_zero_captain: filters.removed_zero_captain,
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
    captains: query.data?.captain_commission_payment ?? [],
    pagination: query.data?.pagination ?? null,
    counts: query.data?.count ?? null,
    isLoading: query.isFetching || query.isLoading,
    loading: query.isLoading || query.isFetching,
    isRefetching: query.isRefetching,
    refetch: query.refetch,
    page,
    pageSize,
  };
}

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getCaptainCommissionPaymentApi } from "../_api/captain-commission-payments";

import { useCaptainCommissionPaymentParams } from "./use-captain-commission-payments-params";

import type { CaptainCommissionPaymentApiResponse } from "../_types/captain-commission-payments-type";

export function useCaptainCommissionPaymentList() {
  const { filters, page, pageSize } = useCaptainCommissionPaymentParams();

  const commissionQuery = useQuery<CaptainCommissionPaymentApiResponse["data"]>(
    {
      queryKey: ["company-earning", filters, page, pageSize],
      queryFn: async () => {
        const res = await getCaptainCommissionPaymentApi({
          captain: filters.captain,
          paid_by: filters.paidBy,
          payment_type: filters.paymentType,
          from_date: filters.fromDate,
          to_date: filters.toDate,
          invoice_number: filters.search,
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
    },
  );

  return {
    commissions: commissionQuery.data?.captain_commission_payment ?? [],
    pagination: commissionQuery.data?.pagination ?? null,
    isLoading: commissionQuery.isFetching || commissionQuery.isLoading,
    loading: commissionQuery.isLoading || commissionQuery.isFetching,
    isRefetching: commissionQuery.isRefetching,
  };
}

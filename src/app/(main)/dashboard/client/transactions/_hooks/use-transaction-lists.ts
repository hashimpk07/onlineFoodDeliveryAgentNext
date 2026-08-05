// "use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useTransactionParams } from "@/app/[locale]/(main)/dashboard/client/transactions/_hooks/use-transaction-params";

import { fetchTransactionReportsData } from "../_api/transaction";

import type { TransactionApiResponse } from "../_types/transaction";

export function useTransactionLists() {
  const { filters, page, pageSize } = useTransactionParams();

  const transactionQuery = useQuery<TransactionApiResponse>({
    queryKey: ["transaction-report", filters, page, pageSize],

    queryFn: async () => {
      const res = await fetchTransactionReportsData({
        ...filters,
        page,
        per_page: pageSize,
      });

      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  return {
    transactions: transactionQuery.data?.transactions ?? [],
    pagination: transactionQuery.data?.pagination ?? null,
    loading: transactionQuery.isFetching,
  };
}

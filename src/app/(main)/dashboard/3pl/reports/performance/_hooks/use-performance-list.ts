import { useQuery } from "@tanstack/react-query";

import { performanceTableData } from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_api/get-performance";
import { useCaptainPerformanceParams } from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_hooks/use-params";
import { CaptainTransactionResponse } from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_types/api";
import { useUser } from "@/hooks/use-user";

export function useCaptainPerformanceList() {
  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;
  const { filters, page, pageSize, sortBy, sortDir } =
    useCaptainPerformanceParams(); //  pull sorting

  const { data, isLoading, isFetching, isError, error } =
    useQuery<CaptainTransactionResponse>({
      queryKey: [
        "captain_transaction",
        companyId,
        filters,
        page,
        pageSize,
        sortBy, //  refetch when sort column changes
        sortDir, //  refetch when sort direction changes
      ],
      enabled: !!companyId,
      queryFn: () =>
        performanceTableData({
          ...filters,
          company_id_3pl: companyId,
          page,
          per_page: pageSize,
          sort_by: sortBy || undefined, //  omitted from request when empty
          sort_order: sortDir || "asc", //  omitted from request when empty
        }),
    });

  return {
    capatian_transaction: data?.captain_transaction ?? [],
    pagination: data?.pagination,
    isLoading,
    isFetching,
    isError,
    error,
  };
}

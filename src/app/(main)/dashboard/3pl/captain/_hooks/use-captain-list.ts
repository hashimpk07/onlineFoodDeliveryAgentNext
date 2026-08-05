import { useQuery } from "@tanstack/react-query";

import { captainsTableData } from "@/app/[locale]/(main)/dashboard/3pl/captain/_api/get-captain-table";
import { useCaptainUrlParams } from "@/app/[locale]/(main)/dashboard/3pl/captain/_hooks/use-captain-params";
import { CaptainsListResponse } from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/api";

/* ───────────── Data fetching ───────────── */

export function useCaptainList() {
  const { filters, page, pageSize } = useCaptainUrlParams();
  const { data, isLoading, isFetching, isError, error } =
    useQuery<CaptainsListResponse>({
      queryKey: ["captains", filters, page, pageSize],
      queryFn: () =>
        captainsTableData({
          ...filters,
          page,
          per_page: pageSize,
        }),
    });

  return {
    captains: data?.captains ?? [],
    pagination: data?.pagination,
    isLoading,
    isFetching,
    isError,
    error,
  };
}

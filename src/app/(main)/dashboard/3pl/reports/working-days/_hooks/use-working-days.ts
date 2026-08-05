import { useQuery } from "@tanstack/react-query";

import { workingDaysData } from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_api/get-working-days";
import { useWorkingDaysParams } from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_hooks/use-params";
import { CaptainWorkingDayResponse } from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_types/api";
import { useUser } from "@/hooks/use-user";

export function useWorkingDaysList() {
  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  const { filters, page, pageSize } = useWorkingDaysParams();

  const { data, isLoading, isFetching, isError, error } =
    useQuery<CaptainWorkingDayResponse>({
      queryKey: ["captain_working_days", companyId, filters, page, pageSize],
      enabled: !!companyId, // wait until companyId exists
      queryFn: () =>
        workingDaysData({
          ...filters,
          company_id_3pl: companyId,
          page,
          per_page: pageSize,
        }),
    });

  return {
    reports: data?.reports ?? [],
    pagination: data?.pagination,
    isLoading,
    isFetching,
    isError,
    error,
  };
}

"use client";
import { useQuery } from "@tanstack/react-query";

import { getDashboardCounts } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_api/get-stats";
import { useDashboardParams } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_hooks/use-dashboard-params";
import { DashboardStatsResponse } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_types/api";
import { useUser } from "@/hooks/use-user";

export default function useDashboardResponse() {
  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;
  const { filters } = useDashboardParams();

  const counts = useQuery<DashboardStatsResponse>({
    queryKey: ["3pl-dashboard-counts", companyId, filters],
    queryFn: () => {
      return getDashboardCounts({
        ...filters,
        company_id_3pl: companyId,
      });
    },
    enabled: !!companyId,
  });

  return {
    counts: counts.data,
    isLoading: counts.isLoading,
  };
}

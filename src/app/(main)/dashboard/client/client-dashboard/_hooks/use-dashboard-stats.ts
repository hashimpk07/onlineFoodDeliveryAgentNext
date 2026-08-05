import { useQuery } from "@tanstack/react-query";

import { getDashboardStatsAction } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_api/get-dashboard-stats";
import { useClientDashboardParams } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_hooks/use-dashboard-params";
import { buildStats } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_lib/build-dashboard-stats";

import { DashboardStats } from "../_types/client-dashboard";

type DashboardStatItem = ReturnType<typeof buildStats>;

export function useClientDashboardStats() {
  const { filters } = useClientDashboardParams();

  const counts = useQuery<DashboardStats, Error, DashboardStatItem>({
    queryKey: ["client-dashboard-counts", filters],
    queryFn: () => getDashboardStatsAction({ ...filters }),
    select: buildStats,
    staleTime: 60 * 1000,
  });

  return {
    counts: counts.data,
    isLoading: counts.isLoading,
  };
}

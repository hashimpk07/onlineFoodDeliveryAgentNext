"use client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import {
  getCaptainActiveInactive,
  getCaptainByRegion,
  getCaptainByVehicle,
  getCaptainShiftStatus,
  getOnlineCaptainOrderCount,
} from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_api/get-charts";
import { CaptainsChartResponse } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_types/api";
import {
  ChartItem,
  TransformedBarChartData,
} from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_types/page";
import {
  transBarChartData,
  transformChartData,
} from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_utility/transform-chart-data";
import { useUser } from "@/hooks/use-user";

import { useDashboardParams } from "./use-dashboard-params";

/**
 * Generic hook to fetch and transform chart data
 */
function useChartQuery<TData = CaptainsChartResponse>(
  queryKey: string,
  queryFn: (
    companyId?: string | number,
    fromDate?: string,
    toDate?: string,
  ) => Promise<CaptainsChartResponse>,
  selectFn: (data: CaptainsChartResponse) => TData,
  companyId?: string | number,
  fromDate?: string,
  toDate?: string,
): UseQueryResult<TData, Error> {
  return useQuery<CaptainsChartResponse, Error, TData>({
    queryKey: [queryKey, companyId, fromDate, toDate],
    queryFn: () => queryFn(companyId, fromDate, toDate),
    enabled: !!companyId,
    select: selectFn,
  });
}

export default function useChartResponse() {
  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;
  const { fromDate, toDate } = useDashboardParams();

  const shiftChart = useChartQuery<ChartItem[]>(
    "3pl-captain-shift-status",
    getCaptainShiftStatus,
    transformChartData,
    companyId,
    fromDate,
    toDate,
  );

  const activeInactiveChart = useChartQuery<ChartItem[]>(
    "3pl-captain-active-inactive",
    getCaptainActiveInactive,
    transformChartData,
    companyId,
    fromDate,
    toDate,
  );

  const captain_by_region = useChartQuery<ChartItem[]>(
    "3pl-captain-by-region",
    getCaptainByRegion,
    transformChartData,
    companyId,
    fromDate,
    toDate,
  );

  const captain_by_vehicle = useChartQuery<ChartItem[]>(
    "3pl-captain-by-vehicle",
    getCaptainByVehicle,
    transformChartData,
    companyId,
    fromDate,
    toDate,
  );

  const online_captains = useChartQuery<TransformedBarChartData>(
    "3pl-captain-online-captains",
    getOnlineCaptainOrderCount,
    transBarChartData,
    companyId,
    fromDate,
    toDate,
  );

  return {
    shift_status: shiftChart.data ?? [],
    shift_loading: shiftChart.isLoading,
    active_inactive_chart: activeInactiveChart.data ?? [],
    active_inactive_chart_loading: activeInactiveChart.isLoading,
    captain_by_region: captain_by_region.data ?? [],
    captain_by_region_loading: captain_by_region.isLoading,
    captain_by_vehicle: captain_by_vehicle.data ?? [],
    captain_by_vehicle_loading: captain_by_vehicle.isLoading,
    online_captains: online_captains.data,
    online_captains_loading: online_captains.isLoading,
  };
}

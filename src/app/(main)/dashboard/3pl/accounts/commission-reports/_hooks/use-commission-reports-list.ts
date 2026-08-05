/* eslint-disable complexity */
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  getCommissionReportsApi,
  getCommissionReportStatisticsApi,
} from "../_api/commission-reports";
import {
  CommissionReportResponse,
  CommissionReportStatisticsResponse,
} from "../_types/commission-reports-type";

import { useCommissionReportParams } from "./use-commission-reports-params";

export function useCommissionReportList() {
  const { filters, page, pageSize } = useCommissionReportParams();

  const commissionQuery = useQuery<CommissionReportResponse["data"]>({
    queryKey: ["third-party-commission", filters, page, pageSize],
    queryFn: async () => {
      const res = await getCommissionReportsApi({
        ...filters,
        page,
        pageSize,
      });

      if (res.status === "error") {
        throw new Error(res.message);
      }

      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 0,
  });

  const statisticsQuery = useQuery<
    CommissionReportStatisticsResponse["data"]["data"]
  >({
    queryKey: ["third-party-commission-count", filters],
    queryFn: async () => {
      const res = await getCommissionReportStatisticsApi({
        ...filters,
      });

      if (res.status === "error") {
        throw new Error(res.message);
      }

      return res.data.data;
    },
    staleTime: 0,
  });

  return {
    reports: commissionQuery.data?.data ?? [],
    pagination: commissionQuery.data?.pagination ?? null,
    counts: statisticsQuery.data ?? null,
    isLoading:
      commissionQuery.isFetching ||
      commissionQuery.isLoading ||
      statisticsQuery.isFetching ||
      statisticsQuery.isLoading,
    loading:
      commissionQuery.isLoading ||
      commissionQuery.isFetching ||
      statisticsQuery.isLoading ||
      statisticsQuery.isFetching,
    isRefetching: commissionQuery.isRefetching || statisticsQuery.isRefetching,
    page,
    pageSize,
    refetch: () => {
      commissionQuery.refetch();
      statisticsQuery.refetch();
    },
  };
}

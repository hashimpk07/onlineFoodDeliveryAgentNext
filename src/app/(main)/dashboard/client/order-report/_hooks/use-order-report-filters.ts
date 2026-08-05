import { useQuery } from "@tanstack/react-query";

import {
  fetchOrderStatusData,
  fetchCaptainData,
} from "@/app/[locale]/(main)/dashboard/client/order-report/_api/get-orders";

import { Captain, Status } from "../_types/order-report-type";

export function useOrderReportFilters() {
  const { data: statusOptions = [], isLoading: statusLoading } = useQuery<
    Status[]
  >({
    queryKey: ["order-status-options"],
    queryFn: async () => {
      const res = await fetchOrderStatusData();
      return res;
    },
  });

  const { data: captainOptions = [], isLoading: captainLoading } = useQuery<
    Captain[]
  >({
    queryKey: ["captain-options"],
    queryFn: async () => {
      const res = await fetchCaptainData();
      return res;
    },
  });

  return {
    statusOptions,
    captainOptions,
    statusLoading,
    captainLoading,
  };
}

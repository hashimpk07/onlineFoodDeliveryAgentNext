import { useQuery } from "@tanstack/react-query";

import { RegionsFilter } from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/api";
import {
  getCaptainFilters,
  getOrderStatus,
  getOrderStatusCounts,
} from "@/app/[locale]/(main)/dashboard/3pl/order/_api/get-filters";
import { OrderStatusCounts } from "@/app/[locale]/(main)/dashboard/3pl/order/_types/api";
import { useUser } from "@/hooks/use-user";

export default function useOrdersFilters() {
  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  const filter_captains = useQuery({
    queryKey: ["filter-captains", companyId],
    queryFn: () => getCaptainFilters(),
    enabled: !!companyId,
  });

  const filter_status = useQuery<RegionsFilter[]>({
    queryKey: ["filter-regions"],
    queryFn: getOrderStatus,
  });

  const order_status_counts = useQuery<OrderStatusCounts>({
    queryKey: ["order-status-counts", companyId],
    queryFn: () => getOrderStatusCounts(companyId),
    enabled: !!companyId,
  });
  return {
    filter_captains: filter_captains.data ?? [],
    filter_status: filter_status.data ?? [],
    order_status_counts: order_status_counts.data,
  };
}

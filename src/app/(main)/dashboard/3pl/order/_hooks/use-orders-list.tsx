import { useQuery } from "@tanstack/react-query";

import { ordersTableData } from "@/app/[locale]/(main)/dashboard/3pl/order/_api/get-orders";
import { useOrdersUrlParams } from "@/app/[locale]/(main)/dashboard/3pl/order/_hooks/use-orders-parms";
import { use3plRealtimeOrders } from "@/app/[locale]/(main)/dashboard/3pl/order/_hooks/use-realtime-orders";
import { OrdersListResponse } from "@/app/[locale]/(main)/dashboard/3pl/order/_types/api";
import { useUser } from "@/hooks/use-user";

/* ───────────── Data fetching ───────────── */

export function useOrdersList() {
  const { filters, page, pageSize } = useOrdersUrlParams();
  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;
  const orderKey = ["orders", filters, page, pageSize, companyId] as const;
  const { data, isLoading, isFetching, isError, error } =
    useQuery<OrdersListResponse>({
      queryKey: orderKey,
      queryFn: () =>
        ordersTableData({
          ...filters,
          page,
          per_page: pageSize,
          company_id_3pl: companyId,
        }),
      enabled: !!companyId,
    });

  use3plRealtimeOrders(orderKey, companyId);

  return {
    orders: data?.order ?? [],
    pagination: data?.pagination,
    isLoading,
    isFetching,
    isError,
    error,
  };
}

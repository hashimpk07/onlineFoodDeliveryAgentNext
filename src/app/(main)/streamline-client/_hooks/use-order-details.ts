import { useQuery } from "@tanstack/react-query";

import { getOrderDetails } from "@/app/[locale]/(main)/streamline-client/_api/get-order-details";
import { OrderResponse } from "@/app/[locale]/(main)/streamline-client/_components/order-details/types";

export function useOrderDetails(order_id: string | null | undefined) {
  const { data, isLoading, isFetching } = useQuery<OrderResponse>({
    queryKey: ["client-order-details", order_id],
    queryFn: () => getOrderDetails(order_id as string),
    enabled: !!order_id, // Only run the query if order_id is truthy
  });

  return {
    data,
    isLoading,
    isFetching,
  };
}

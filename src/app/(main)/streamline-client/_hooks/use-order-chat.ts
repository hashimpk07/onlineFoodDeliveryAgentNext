import { useQuery } from "@tanstack/react-query";

import { getOrderMessages } from "@/app/[locale]/(main)/streamline-client/_api/get-order-details";
import { TicketMessage } from "@/app/[locale]/(main)/streamline-client/_components/chat-ticket/types";

export function useOrderChat(order_id: string | null | undefined) {
  const { data, isLoading, isFetching } = useQuery<TicketMessage[]>({
    queryKey: ["client-order-chats", order_id],
    queryFn: () => getOrderMessages(order_id as string),
    enabled: !!order_id, // Only run the query if order_id is truthy
    refetchInterval: 30000, // 30 seconds in ms
  });

  return {
    data,
    isLoading,
    isFetching,
  };
}

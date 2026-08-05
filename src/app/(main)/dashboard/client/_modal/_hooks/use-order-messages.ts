"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getOrderMessages, sendOrderMessage } from "../_api/order-message";

import type { TicketMessage } from "../_type/chatbox";

const POLL_INTERVAL = 10000;

async function fetchMessages(orderId: string): Promise<TicketMessage[]> {
  const res = await getOrderMessages(orderId);
  if (res.status === "error") throw new Error(res.message);
  return res.data;
}

async function postMessage(
  orderId: string,
  message: string,
): Promise<TicketMessage> {
  const res = await sendOrderMessage(orderId, { message });
  if (res.status === "error") throw new Error(res.message);
  return res.data;
}

export function orderMessagesQueryKey(orderId: string) {
  return ["order-messages", orderId] as const;
}

export function useOrderMessages(orderId: string, enabled: boolean) {
  return useQuery({
    queryKey: orderMessagesQueryKey(orderId),
    queryFn: () => fetchMessages(orderId),
    enabled: enabled && !!orderId,
    refetchInterval: POLL_INTERVAL,
    refetchIntervalInBackground: false,
  });
}

export function useSendOrderMessage(
  orderId: string,
  senderEmail: string | null,
) {
  const queryClient = useQueryClient();
  const queryKey = orderMessagesQueryKey(orderId);

  return useMutation({
    mutationFn: (message: string) => postMessage(orderId, message),
    onMutate: async (message) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<TicketMessage[]>(queryKey);

      const optimisticMessage: TicketMessage = {
        id: -Date.now(),
        message,
        ticket_id: 0,
        sender_id: 0,
        sender_email: senderEmail ?? "",
        sender_type: "CLIENT_EMPLOYEE",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      queryClient.setQueryData<TicketMessage[]>(queryKey, (old = []) => [
        ...old,
        optimisticMessage,
      ]);

      return { previous };
    },
    onError: (_error, _message, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

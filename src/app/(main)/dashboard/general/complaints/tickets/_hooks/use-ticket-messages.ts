"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getTicketMessages } from "../_api/get-ticket-messages";
import { sendTicketMessage } from "../_api/send-ticket-message";
import {
  ComplaintMessagesResponse,
  RawComplaintMessage,
  TicketMessage,
} from "../_types";

function mapMessage(raw: RawComplaintMessage): TicketMessage {
  return {
    id: raw.id,
    sender: raw.sender_name?.trim() ?? "Unknown",
    message: raw.message,
    created_at: raw.send_at,
    is_own: raw.is_own,
  };
}

export function useTicketMessages(ticketId: number | null) {
  const queryKey = ["ticket-messages", ticketId];
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey,
    queryFn: () => getTicketMessages(ticketId as number),
    enabled: ticketId != null,
    refetchInterval: 15000,
  });

  const sendMessage = useMutation({
    mutationFn: (message: string) =>
      sendTicketMessage(ticketId as number, message),

    onSuccess: (res) => {
      queryClient.setQueryData<ComplaintMessagesResponse>(queryKey, (prev) =>
        prev
          ? { ...prev, data: [...prev.data, res.data] }
          : { status: res.status, message: res.message, data: [res.data] },
      );
    },

    onError: () => {
      toast.error("Failed to send message. Please try again.");
    },
  });

  return {
    messages: (query.data?.data ?? []).map(mapMessage),
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    error: query.error,
    sendMessage: sendMessage.mutate,
    isSending: sendMessage.isPending,
  };
}

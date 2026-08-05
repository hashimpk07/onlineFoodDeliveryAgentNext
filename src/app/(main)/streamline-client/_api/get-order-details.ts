"use server";

import { TicketMessage } from "@/app/[locale]/(main)/streamline-client/_components/chat-ticket/types";
import { OrderResponse } from "@/app/[locale]/(main)/streamline-client/_components/order-details/types";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function getOrderDetails(order_id: string) {
  return api
    .get<ApiResponse<OrderResponse>>(`/client/order/${order_id}`, {
      params: {
        has_streamline_view: true,
      },
    })
    .then(unwrapResponse);
}

export async function getOrderMessages(order_id: string) {
  return api
    .get<ApiResponse<TicketMessage[]>>(`/public/complaint/${order_id}/messages`)
    .then(unwrapResponse);
}

export async function sendTicketMessage(order_id: string, message: string) {
  return api
    .post<ApiResponse<TicketMessage>>(`/public/complaint/${order_id}/message`, {
      message,
    })
    .then(unwrapResponse);
}

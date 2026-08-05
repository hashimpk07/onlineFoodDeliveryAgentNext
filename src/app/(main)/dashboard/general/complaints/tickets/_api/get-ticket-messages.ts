"use server";

import { api } from "@/lib/api.client";

import { ComplaintMessagesResponse } from "../_types";

export async function getTicketMessages(
  ticketId: number | string,
): Promise<ComplaintMessagesResponse> {
  try {
    return await api.get<ComplaintMessagesResponse>(
      `/public/ticket/${ticketId}/messages`,
    );
  } catch (error) {
    console.error("Ticket Messages API Error:", error);
    throw error;
  }
}

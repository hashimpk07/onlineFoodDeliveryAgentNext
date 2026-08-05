"use server";

import { api } from "@/lib/api.client";

import { SendComplaintMessageResponse } from "../_types";

export async function sendTicketMessage(
  ticketId: number | string,
  message: string,
): Promise<SendComplaintMessageResponse> {
  try {
    return await api.post<SendComplaintMessageResponse>(
      `/public/ticket/${ticketId}/message`,
      { message },
    );
  } catch (error) {
    console.error("Send Ticket Message API Error:", error);
    throw error;
  }
}

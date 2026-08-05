"use server";

import { api } from "@/lib/api.client";

import { TicketDetailsResponse } from "../_types";

export async function getTicketDetails(
  id: number | string,
): Promise<TicketDetailsResponse> {
  try {
    return await api.get<TicketDetailsResponse>(`/public/ticket/${id}`);
  } catch (error) {
    console.error("Ticket Details API Error:", error);
    throw error;
  }
}

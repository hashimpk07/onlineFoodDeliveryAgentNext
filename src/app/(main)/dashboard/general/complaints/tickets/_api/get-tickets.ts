"use server";

import { api } from "@/lib/api.client";

import { TicketsListResponse } from "../_types";

export async function getTickets(): Promise<TicketsListResponse> {
  try {
    return await api.get<TicketsListResponse>("/public/tickets");
  } catch (error) {
    console.error("Tickets API Error:", error);
    throw error;
  }
}

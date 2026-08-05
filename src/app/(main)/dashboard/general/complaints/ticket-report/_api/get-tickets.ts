/* eslint-disable */
"use server";

import { api } from "@/lib/api.client";

import { TicketListParams, TicketListResponse } from "../_types";

export async function getTickets(
  params: TicketListParams,
): Promise<TicketListResponse> {
  const { page = 1, per_page = 20, from_date, to_date } = params;

  try {
    const res = await api.get<TicketListResponse>("/general/reports/tickets", {
      params: {
        page,
        per_page,
        from_date,
        to_date,
      },
    });

    console.log("getTickets API Success:", JSON.stringify(res, null, 2));
    return res;
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Tickets Report API Error:", err.message);
    throw err;
  }
}

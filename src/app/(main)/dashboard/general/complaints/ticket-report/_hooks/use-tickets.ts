"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getTickets } from "../_api/get-tickets";
import { TicketListParams } from "../_types";

export function useTickets(params: TicketListParams) {
  const { from_date, to_date } = params;

  return useQuery({
    queryKey: ["tickets-report", params],
    queryFn: () => getTickets(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    enabled: !!from_date && !!to_date,
  });
}

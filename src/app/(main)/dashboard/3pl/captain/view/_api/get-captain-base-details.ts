"use server";
import {
  CaptainDetails,
  CaptainDetailsStats,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function BaseCaptainDetails(captain_id: number) {
  const response = await api.get<ApiResponse<CaptainDetails>>(
    `/3pl/captain/${captain_id}`,
  );

  return unwrapResponse(response);
}

export async function CaptainDetailStats(params: {
  captain_id: number;
  fromDate?: string;
  toDate?: string;
}) {
  const { captain_id, fromDate, toDate } = params;

  const response = await api.get<ApiResponse<CaptainDetailsStats>>(
    `/3pl/captain/${captain_id}/stats`,
    {
      params: {
        from_date: fromDate,
        to_date: toDate,
      },
    },
  );

  return unwrapResponse(response);
}

"use server";
import {
  CaptainOrderHistoryResponse,
  CaptainShiftHistoryResponse,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function CaptainShiftLogs(params: {
  captain_id: number;
  shift_page?: number;
  shift_page_size?: number;
}) {
  const { captain_id, shift_page_size, shift_page } = params;
  const response = await api.get<ApiResponse<CaptainShiftHistoryResponse>>(
    `/3pl/captain/${captain_id}/shift-logs`,
    {
      params: {
        page: shift_page,
        per_page: shift_page_size,
      },
    },
  );

  return unwrapResponse(response);
}

export async function CaptainOrderLogs(params: {
  captain_id: number;
  order_page?: number;
  order_page_size?: number;
}) {
  const { captain_id, order_page, order_page_size } = params;
  const response = await api.get<ApiResponse<CaptainOrderHistoryResponse>>(
    `/3pl/captain/${captain_id}/order-logs`,
    {
      params: {
        page: order_page,
        per_page: order_page_size,
      },
    },
  );

  return unwrapResponse(response);
}

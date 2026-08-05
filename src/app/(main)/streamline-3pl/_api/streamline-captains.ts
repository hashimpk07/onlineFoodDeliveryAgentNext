"use server";

import { ApiResponse } from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import {
  CaptainDetailsDataResponse,
  MapStatusFilters,
  OrderListItemResponse,
  StreamlineCaptain,
} from "@/app/[locale]/(main)/streamline-3pl/_lib/types";
import { api } from "@/lib/api.client";
import { StreamlinePaginatedResponse } from "@/lib/streamline-cursor-pagination";
import { unwrapResponse } from "@/lib/unwrap-response";

export type Streamline3plOrderFilters = {
  status?: string;
  search?: string;
  company_id_3pl: number | undefined | null;
  cursor?: string | null;
};

export type StreamlineCaptainsFilters = {
  show?: string;
  search?: string;
  company: number | null | undefined;
  cursor?: string | null;
};
export async function StreamLine3plCaptains(
  filters: StreamlineCaptainsFilters,
): Promise<StreamlinePaginatedResponse<StreamlineCaptain>> {
  return api
    .get<ApiResponse<StreamlinePaginatedResponse<StreamlineCaptain>>>(
      "/3pl/streamline/captains",
      { params: filters },
    )
    .then(unwrapResponse);
}

export async function StreamLine3plOrders(
  filters: Streamline3plOrderFilters,
): Promise<StreamlinePaginatedResponse<OrderListItemResponse>> {
  return api
    .get<ApiResponse<StreamlinePaginatedResponse<OrderListItemResponse>>>(
      "/3pl/streamline/orders",
      { params: filters },
    )
    .then(unwrapResponse);
}

export async function StreamLine3plFilters(
  companyId: string | null | undefined,
): Promise<MapStatusFilters[]> {
  return api
    .get<ApiResponse<MapStatusFilters[]>>("/3pl/streamline/filters", {
      params: {
        company_id_3pl: companyId,
      },
    })
    .then(unwrapResponse);
}

export async function StreamLine3plCaptainDetails(
  captainId: string,
): Promise<CaptainDetailsDataResponse> {
  return api
    .get<ApiResponse<CaptainDetailsDataResponse>>(
      `/3pl/streamline/captain/${captainId}`,
    )
    .then(unwrapResponse);
}

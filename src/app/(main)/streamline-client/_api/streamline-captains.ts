"use server";

import { ApiResponse } from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import {
  MapStatusFilters,
  OrderListItem,
  StreamlineCaptain,
} from "@/app/[locale]/(main)/streamline-client/_lib/types";
import { api } from "@/lib/api.client";
import { StreamlinePaginatedResponse } from "@/lib/streamline-cursor-pagination";
import { unwrapResponse } from "@/lib/unwrap-response";

export type StreamlineOrderFilters = {
  status?: string;
  search?: string;
  has_client_chat?: number;
  scheduled?: number;
  show?: string;
  region?: number[];
  company?: number[];
  employment_type?: number[];
  cursor?: string | null;
};

export type StreamlineCaptainsFilters = {
  show?: string;
  status?: number[];
  search?: string;
  region?: number[];
  company?: number[];
  employment_type?: number[];
  order?: string;
  cursor?: string | null;
};
export async function StreamLineCaptains(
  filters: StreamlineCaptainsFilters,
): Promise<StreamlinePaginatedResponse<StreamlineCaptain>> {
  return api
    .get<ApiResponse<StreamlinePaginatedResponse<StreamlineCaptain>>>(
      "/client/streamline/captains",
      { params: filters },
    )
    .then(unwrapResponse);
}

export async function StreamLineOrdersCard(
  filters: StreamlineOrderFilters,
): Promise<StreamlinePaginatedResponse<OrderListItem>> {
  return api
    .get<ApiResponse<StreamlinePaginatedResponse<OrderListItem>>>(
      "/client/streamline/orders",
      { params: filters },
    )
    .then(unwrapResponse);
}

export async function StreamLineFilters(): Promise<MapStatusFilters[]> {
  return api
    .get<ApiResponse<MapStatusFilters[]>>("/client/streamline/filters")
    .then(unwrapResponse);
}

"use server";

import {
  ApiResponse,
  Client,
  ClientsShopsResponse,
  orderFilters,
  OrdersApiResponse,
  OrdersSummaryCardsProps,
  ShopsData,
  Status,
} from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";

export async function orderTabledatas(
  filters: orderFilters,
): Promise<OrdersApiResponse> {
  return await api
    .get<ApiResponse<OrdersApiResponse>>("/client/orders_list", {
      params: filters,
    })
    .then(unwrapResponse);
}

export async function orderShopData(): Promise<ShopsData> {
  return await api
    .get<ApiResponse<ShopsData>>("/client/client-shops")
    .then(unwrapResponse);
}

export async function orderStatusData(): Promise<Status[]> {
  return await api
    .get<ApiResponse<Status[]>>("/public/order-status?logistics=1")
    .then(unwrapResponse);
}

export async function orderStatusCardData(): Promise<OrdersSummaryCardsProps> {
  return api
    .get<ApiResponse<OrdersSummaryCardsProps>>("/client/order-status/count")
    .then(unwrapResponse);
}

export async function ordersShopData(): Promise<ClientsShopsResponse> {
  return await api
    .get<ApiResponse<ClientsShopsResponse>>("/client/client-order-list")
    .then(unwrapResponse);
}

export async function ordersClientsData(): Promise<Client[]> {
  return await api
    .get<ApiResponse<Client[]>>("/public/clients")
    .then(unwrapResponse);
}

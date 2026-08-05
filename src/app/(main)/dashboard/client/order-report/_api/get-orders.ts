"use server";

import {
  ApiResponse,
  Captain,
  OrdersApiResponse,
  Status,
} from "@/app/[locale]/(main)/dashboard/client/order-report/_types/order-report-type";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";

export type OrderReportFilters = {
  clientOrder?: string;
  fromDate?: string;
  toDate?: string;
  timeFrom?: string;
  timeTo?: string;
  captainId?: string[];
  statusId?: string;
  page?: number;
  pageSize?: number;
};

export async function fetchOrderReportsData(
  filters: OrderReportFilters,
): Promise<OrdersApiResponse> {
  return await api
    .get<ApiResponse<OrdersApiResponse>>("/client/orders_list/report", {
      params: filters,
    })
    .then(unwrapResponse);
}

export async function fetchCaptainData(): Promise<Captain[]> {
  return await api
    .get<ApiResponse<Captain[]>>("/public/order-reports-captains")
    .then(unwrapResponse);
}

export async function fetchOrderStatusData(): Promise<Status[]> {
  return await api
    .get<ApiResponse<Status[]>>("/public/order-status", {
      params: { finished: true },
    })
    .then(unwrapResponse);
}

"use server";

import { OrdersListResponse } from "@/app/[locale]/(main)/dashboard/3pl/order/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function ordersTableData(params: {
  page?: number;
  per_page?: number;
  [key: string]: any;
}): Promise<OrdersListResponse> {
  const { page, per_page, ...filters } = params;

  return api
    .get<ApiResponse<OrdersListResponse>>("/3pl/order", {
      params: {
        ...filters,
        page,
        per_page,
      },
    })
    .then(unwrapResponse);
}

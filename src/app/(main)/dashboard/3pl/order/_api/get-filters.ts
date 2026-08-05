"use server";
import {
  FilterCaptain,
  FilterVehicleType,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/api";
import { OrderStatusCounts } from "@/app/[locale]/(main)/dashboard/3pl/order/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function getCaptainFilters(): Promise<FilterCaptain[]> {
  return api
    .get<ApiResponse<FilterCaptain[]>>("3pl/captain")
    .then(unwrapResponse);
}

export async function getOrderStatus(): Promise<FilterVehicleType[]> {
  return api
    .get<ApiResponse<FilterVehicleType[]>>("3pl/order-status")
    .then(unwrapResponse);
}

export async function getOrderStatusCounts(
  companyId: number | undefined,
): Promise<OrderStatusCounts> {
  return api
    .get<ApiResponse<OrderStatusCounts>>("3pl/order-status/count", {
      params: {
        company_id_3pl: companyId,
      },
    })
    .then(unwrapResponse);
}

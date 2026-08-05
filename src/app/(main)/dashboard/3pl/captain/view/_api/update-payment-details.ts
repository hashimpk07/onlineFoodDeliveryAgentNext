"use server";
import {
  OrderPayment,
  UpdatePaymentData,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function getOrderPayment(order_id: string) {
  return api
    .get<ApiResponse<OrderPayment>>(`/3pl/order/${order_id}/payment`)
    .then(unwrapResponse);
}

export async function updateOrderPayment(
  order_id: string,
  data: UpdatePaymentData,
) {
  console.log(order_id);
  return api
    .post<ApiResponse<any>>(`/3pl/order-payment/${order_id}`, data)
    .then(unwrapResponse);
}

"use server";

// order client view api,s

import { notFound } from "next/navigation";

import { DirectionResponse } from "@/app/[locale]/(main)/dashboard/3pl/order/[id]/_components/delivery-map/types";
import {
  ApiResponse,
  OrderDetailsResponse,
} from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";

export async function ordersClientView(
  id: string,
): Promise<OrderDetailsResponse> {
  try {
    return await api
      .get<ApiResponse<OrderDetailsResponse>>(`/3pl/order/${id}`)
      .then(unwrapResponse);
  } catch (error: any) {
    if (error.response?.status === 404) {
      notFound();
    }
    throw error;
  }
}

export async function ordersDirections(id: string): Promise<DirectionResponse> {
  try {
    return await api
      .get<ApiResponse<DirectionResponse>>(`/3pl/order/directions/${id}`)
      .then(unwrapResponse);
  } catch (error: any) {
    if (error.response?.status === 404) {
      notFound();
    }
    throw error;
  }
}

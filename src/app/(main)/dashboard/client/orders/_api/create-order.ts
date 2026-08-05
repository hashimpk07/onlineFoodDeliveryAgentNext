"use server";

import {
  ApiResponse,
  ClientsShopsResponse,
} from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { api } from "@/lib/api.client";

export interface CreateOrderIndexedPayload {
  client_id: number | string;
  shopname: string;

  client_order_id: string[];
  customer_name: string[];
  delivery_type: number[];
  delivery_date: (string | null)[];
  delivery_time: (string | number)[];
  customer_number: string[];
  delivery_payment_mode: string[];
  amount: number[];
  address: string[];
}

export async function createOrderApi(payload: CreateOrderIndexedPayload) {
  try {
    return await api.post("/public/orders/create/new", payload);
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      status: "error",
      message: error.message ?? "An unexpected error occurred",
    };
  }
}

// date slots

export async function dateSlotApi(): Promise<
  ApiResponse<ClientsShopsResponse>
> {
  try {
    const responseData =
      await api.get<ApiResponse<ClientsShopsResponse>>("/public/timeslots");
    if (
      (typeof responseData.status === "string" &&
        responseData.status === "error") ||
      !responseData.data
    ) {
      throw new Error(
        responseData.message || "Failed to fetch order orders data",
      );
    }

    return {
      status: responseData.status,
      message: responseData.message ?? "",
      data: responseData.data,
    };
  } catch (error) {
    console.error("Order list :", error);

    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unexpected error occurred",
    };
  }
}

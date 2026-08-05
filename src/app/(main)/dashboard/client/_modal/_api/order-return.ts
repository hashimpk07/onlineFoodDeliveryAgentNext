"use server";

import { ApiResponse } from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { api } from "@/lib/api.client";

export interface ReturnOrderResponse {
  order_id: number;
  status: "accepted" | "declined" | string;
}

export async function acceptReturnOrder(
  orderId: number | string,
): Promise<ApiResponse<ReturnOrderResponse>> {
  try {
    const responseData = await api.post<ApiResponse<ReturnOrderResponse>>(
      "/client/return-order-accept",
      {
        order_id: Number(orderId),
      },
    );

    if (responseData.status === "error" || !responseData.data) {
      throw new Error(responseData.message || "Failed to accept return order");
    }

    return {
      status: responseData.status,
      message: responseData.message ?? "",
      data: responseData.data,
    };
  } catch (error) {
    console.error("Accept return order:", error);

    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unexpected error occurred",
    };
  }
}

export async function declineReturnOrder(payload: {
  orderId: number | string;
  reason: string;
}): Promise<ApiResponse<ReturnOrderResponse>> {
  try {
    const responseData = await api.post<ApiResponse<ReturnOrderResponse>>(
      "/client/return-order-decline",
      {
        order_id: Number(payload.orderId),
        reason: payload.reason,
      },
    );

    if (responseData.status === "error" || !responseData.data) {
      throw new Error(responseData.message || "Failed to decline return order");
    }

    return {
      status: responseData.status,
      message: responseData.message ?? "",
      data: responseData.data,
    };
  } catch (error) {
    console.error("Decline return order:", error);

    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unexpected error occurred",
    };
  }
}

"use server";

import { api } from "@/lib/api.client";

import { OrderStatusGraphResponse } from "../_types/client-dashboard";

export default async function orderStatusGraphAction(): Promise<OrderStatusGraphResponse> {
  try {
    const responseData = await api.get<OrderStatusGraphResponse>(
      "/client/status-graph/count",
    );

    if (responseData.status === "error" || !responseData.data) {
      throw new Error(
        responseData.message || "Failed to fetch order status graph data",
      );
    }

    return responseData;
  } catch (error) {
    console.error("Order Status Graph error:", error);

    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unexpected error occurred",
      data: [],
    };
  }
}

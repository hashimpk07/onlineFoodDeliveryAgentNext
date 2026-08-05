"use server";

import { api } from "@/lib/api.client";

import { MonthlyOrderStatusResponse } from "../_types/client-dashboard";

export async function getMonthlyOrderStatusAction(): Promise<MonthlyOrderStatusResponse> {
  try {
    const responseData = await api.get<MonthlyOrderStatusResponse>(
      "/client/status-month/count",
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

"use server";

import { api } from "@/lib/api.client";

import { PendingOrdersListParams, PendingOrdersListResponse } from "../_types";

export async function getPendingOrders(
  params: PendingOrdersListParams,
): Promise<PendingOrdersListResponse> {
  try {
    return await api.get<PendingOrdersListResponse>("/general/pending-orders", {
      params,
    });
  } catch (error) {
    console.error("Salary Payments API Error:", error);
    throw error;
  }
}

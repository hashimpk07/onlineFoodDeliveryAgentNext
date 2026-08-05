"use server";

import { api } from "@/lib/api.client";

import type {
  ApiResponse,
  CancellationReason,
} from "../_type/order-cancellation";

export async function fetchCancellationReasons() {
  const res = await api.get<ApiResponse<CancellationReason[]>>(
    "/public/order-cancellation-reasons?is_4u_reason=false",
  );

  if (res.status === "error") {
    throw new Error(res.message);
  }

  return res.data;
}

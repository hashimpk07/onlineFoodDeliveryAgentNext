"use server";

import { api } from "@/lib/api.client";

import type { ApiResponse, PaidBy } from "../_types/reconciliation-type";

export async function fetchPaidByData(): Promise<PaidBy[]> {
  return api
    .get<ApiResponse<PaidBy[]>>(`/3pl/captain-paid-by`)
    .then((res) => res.data);
}

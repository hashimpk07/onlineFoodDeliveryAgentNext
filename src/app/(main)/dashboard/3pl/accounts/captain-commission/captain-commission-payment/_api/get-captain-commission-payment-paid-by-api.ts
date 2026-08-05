"use server";
import { api } from "@/lib/api.client";

import type {
  ApiResponse,
  PaidBy,
} from "../_types/captain-commission-payments-type";

export async function fetchPaidByData(companyId: number): Promise<PaidBy[]> {
  return api
    .get<ApiResponse<PaidBy[]>>(`/3pl/captain-paid-by?company__id=${companyId}`)
    .then((res) => res.data);
}

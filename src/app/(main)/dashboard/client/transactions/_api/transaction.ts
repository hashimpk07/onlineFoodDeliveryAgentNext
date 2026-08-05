"use server";

import { api } from "@/lib/api.client";

import type {
  ApiResponse,
  TransactionApiResponse,
  TransactionReportFilters,
} from "../_types/transaction";

function appendParams(filters: TransactionReportFilters) {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.per_page) params.set("per_page", String(filters.per_page));

  return params;
}

export async function fetchTransactionReportsData(
  filters: TransactionReportFilters,
): Promise<ApiResponse<TransactionApiResponse>> {
  const params = appendParams(filters);

  const response = await api.get<ApiResponse<TransactionApiResponse>>(
    `/client/transactions?${params.toString()}`,
  );

  if (response.status === "error") {
    throw new Error(response.message);
  }

  return response;
}

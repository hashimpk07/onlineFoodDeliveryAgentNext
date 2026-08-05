"use server";
import { CaptainTransactionResponse } from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function performanceTableData(params: {
  page?: number;
  per_page?: number;
  [key: string]: any;
}): Promise<CaptainTransactionResponse> {
  const { page, per_page, ...filters } = params;

  return api
    .get<ApiResponse<CaptainTransactionResponse>>("/3pl/captain-performance", {
      params: {
        ...filters,
        page,
        per_page,
      },
    })
    .then(unwrapResponse);
}

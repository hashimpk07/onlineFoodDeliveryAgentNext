"use server";
import { CaptainsListResponse } from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function captainsTableData(params: {
  page?: number;
  per_page?: number;
  [key: string]: any;
}): Promise<CaptainsListResponse> {
  const { page, per_page, ...filters } = params;

  return api
    .get<ApiResponse<CaptainsListResponse>>("/3pl/captain-list", {
      params: {
        ...filters,
        page,
        per_page,
      },
    })
    .then(unwrapResponse);
}

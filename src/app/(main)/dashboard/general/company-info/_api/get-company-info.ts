"use server";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function getCompanyInfoData(params?: {
  page?: number;
  per_page?: number;
}): Promise<unknown> {
  const { page, per_page } = params ?? {};
  return api
    .get<ApiResponse<unknown>>("/general/companies", {
      params: { page, per_page },
    })
    .then(unwrapResponse);
}

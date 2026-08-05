"use server";

import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

import { CompanyInfo, UpdateCompanyPayload } from "../_types";

export async function updateCompanyDetailsData(
  id: string,
  data: UpdateCompanyPayload,
): Promise<CompanyInfo> {
  return api
    .put<ApiResponse<CompanyInfo>>(`/general/companies/${id}`, data)
    .then(unwrapResponse);
}

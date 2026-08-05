"use server";

import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

import { CompanyInfo } from "../_types";

export async function getCompanyDetailsData(id: string): Promise<CompanyInfo> {
  return api
    .get<ApiResponse<CompanyInfo>>(`/general/companies/${id}`)
    .then(unwrapResponse)
    .then((res: any) => res?.data ?? res);
}

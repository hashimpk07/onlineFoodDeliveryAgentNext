"use server";

import { DashboardStatsResponse } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function getDashboardCounts(params: {
  from_date?: string | null;
  to_date?: string | null;
  company_id_3pl?: string | number;
}): Promise<DashboardStatsResponse> {
  return api
    .get<ApiResponse<DashboardStatsResponse>>("/3pl/dashboard-count", {
      params,
    })
    .then(unwrapResponse);
}

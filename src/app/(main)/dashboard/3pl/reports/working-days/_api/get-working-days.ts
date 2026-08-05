"use server";
import { CaptainWorkingDayResponse } from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function workingDaysData(params: {
  page?: number;
  per_page?: number;
  [key: string]: any;
}): Promise<CaptainWorkingDayResponse> {
  const { page, per_page, ...filters } = params;

  return api
    .get<ApiResponse<CaptainWorkingDayResponse>>("/3pl/captains/working-days", {
      params: {
        ...filters,
        page,
        per_page,
      },
    })
    .then(unwrapResponse);
}

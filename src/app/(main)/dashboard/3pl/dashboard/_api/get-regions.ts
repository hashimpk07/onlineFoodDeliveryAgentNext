"use server";
import { AreaFilter } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function getRegionsFilters(): Promise<AreaFilter[]> {
  return api
    .get<ApiResponse<AreaFilter[]>>("/public/areas")
    .then(unwrapResponse);
}

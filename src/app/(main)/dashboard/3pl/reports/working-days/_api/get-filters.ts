"use server";
import {
  AreaFilter,
  FilterCaptain,
  RegionsFilter,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function getCaptainFilters(
  companyId?: number,
): Promise<FilterCaptain[]> {
  return api
    .get<ApiResponse<FilterCaptain[]>>("/public/captains", {
      params: { "3pl_company": companyId },
    })
    .then(unwrapResponse);
}

export async function getAreasFilters(): Promise<AreaFilter[]> {
  return api
    .get<ApiResponse<AreaFilter[]>>("/public/areas")
    .then(unwrapResponse);
}

export async function getRegionsFilters(): Promise<RegionsFilter[]> {
  return api
    .get<ApiResponse<RegionsFilter[]>>("/public/regions")
    .then(unwrapResponse);
}

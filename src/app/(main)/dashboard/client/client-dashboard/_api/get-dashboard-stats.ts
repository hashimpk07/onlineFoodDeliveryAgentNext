"use server";

import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

import { DashboardStats } from "../_types/client-dashboard";

export async function getDashboardStatsAction(
  params: Record<string, string | number | boolean>,
): Promise<DashboardStats> {
  return api
    .get<ApiResponse<DashboardStats>>("/client/dashboard/count", { params })
    .then(unwrapResponse);
}

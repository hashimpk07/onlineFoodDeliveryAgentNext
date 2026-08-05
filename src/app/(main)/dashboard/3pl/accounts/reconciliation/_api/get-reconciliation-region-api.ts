"use server";

import { api } from "@/lib/api.client";

import type { ApiResponse, Regions } from "../_types/reconciliation-type";

export async function fetchRegionData(): Promise<Regions[]> {
  const res = await api.get<ApiResponse<Regions[]>>("/public/regions");
  return res.data;
}

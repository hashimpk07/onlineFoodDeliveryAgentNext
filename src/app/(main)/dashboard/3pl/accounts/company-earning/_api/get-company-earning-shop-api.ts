"use server";

import { api } from "@/lib/api.client";

import type { ApiResponse, Shop } from "../_types/company-earning-type";

export async function fetchShopData(): Promise<Shop[]> {
  const res = await api.get<ApiResponse<Shop[]>>("/public/client/shops");
  return res.data;
}

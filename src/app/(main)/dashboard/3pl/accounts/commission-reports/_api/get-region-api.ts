"use server";

import { api } from "@/lib/api.client";

interface Region {
  id: number;
  name: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}

export async function fetchRegionData(): Promise<Region[]> {
  const res = await api.get<ApiResponse<Region[]>>("/public/regions");
  return res.data;
}

"use server";
import { api } from "@/lib/api.client";

import type { ApiResponse, Area } from "../_types/captain-commission-type";

export async function fetchAreaData(): Promise<Area[]> {
  return api.get<ApiResponse<Area[]>>("/public/areas").then((res) => {
    return res.data;
  });
}

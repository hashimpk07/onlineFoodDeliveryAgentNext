"use server";
import { api } from "@/lib/api.client";

import type { ApiResponse, Area } from "../_types/vehicle-type";

export async function fetchAreaData(): Promise<Area[]> {
  return api.get<ApiResponse<Area[]>>("/public/areas").then((res) => {
    return res.data;
  });
}

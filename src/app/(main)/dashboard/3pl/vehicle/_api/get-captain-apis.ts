"use server";
import { api } from "@/lib/api.client";

import type { ApiResponse, Captain } from "../_types/vehicle-type";

export async function fetchCaptainData(): Promise<Captain[]> {
  return api.get<ApiResponse<Captain[]>>("/3pl/captain").then((res) => {
    return res.data;
  });
}

"use server";
import { api } from "@/lib/api.client";

import type { ApiResponse, Owner } from "../_types/vehicle-type";

export async function fetchOwnerData(): Promise<Owner[]> {
  return api.get<ApiResponse<Owner[]>>("/public/owner").then((res) => {
    return res.data;
  });
}

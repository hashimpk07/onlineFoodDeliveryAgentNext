"use server";
import { api } from "@/lib/api.client";

import type { ApiResponse, Captain } from "../_types/captain-commission-type";

export async function fetchClientData(): Promise<Captain[]> {
  return api.get<ApiResponse<Captain[]>>("/3pl/captain").then((res) => {
    return res.data;
  });
}

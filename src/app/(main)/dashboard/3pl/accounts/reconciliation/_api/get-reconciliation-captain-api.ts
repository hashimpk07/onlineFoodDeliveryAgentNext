"use server";
import { api } from "@/lib/api.client";

import type { ApiResponse, Captain } from "../_types/reconciliation-type";

export async function fetchCaptainData(): Promise<Captain[]> {
  return api
    .get<ApiResponse<Captain[]>>("/3pl/reconciliation-captain-list")
    .then((res) => {
      return res.data;
    });
}

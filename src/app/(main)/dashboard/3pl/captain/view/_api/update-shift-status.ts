"use server";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function updateVehicleKm(shift_status: string, data: any) {
  return api
    .post<ApiResponse<any[]>>(
      `/3pl/shift-status/${shift_status}/update-km`,
      data,
    )
    .then(unwrapResponse);
}

"use server";
import { api } from "@/lib/api.client";

import type { ApiResponse, VehicleType } from "../_types/vehicle-type";

export async function fetchVehicleTypeData(): Promise<VehicleType[]> {
  return api
    .get<ApiResponse<VehicleType[]>>("/public/vehicle-types")
    .then((res) => {
      return res.data;
    });
}

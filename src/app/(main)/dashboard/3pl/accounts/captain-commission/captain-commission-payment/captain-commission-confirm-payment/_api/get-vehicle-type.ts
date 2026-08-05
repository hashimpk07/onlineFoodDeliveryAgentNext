"use server";
import { api } from "@/lib/api.client";

import type {
  ApiResponse,
  VehicleType,
} from "../_types/captain-commission-confirm-payment-type";

export async function fetchVehicleTypesData(): Promise<VehicleType[]> {
  return api
    .get<ApiResponse<VehicleType[]>>("/public/vehicle-types")
    .then((res) => {
      return res.data;
    });
}

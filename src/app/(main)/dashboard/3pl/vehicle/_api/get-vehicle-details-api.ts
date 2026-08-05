/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { api } from "@/lib/api.client";

import { VehicleDetailsResponse } from "../_types/vehicle-type";

export async function getVehicleDetailsApi(
  id: string | number,
): Promise<VehicleDetailsResponse> {
  try {
    const response = await api.get<VehicleDetailsResponse>(
      `/3pl/vehicles/${id}`,
    );

    return response;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      status: "error",
      message: error.message ?? "Failed to fetch vehicle details",
      data: {} as any,
    };
  }
}

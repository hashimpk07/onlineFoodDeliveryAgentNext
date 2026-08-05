"use server";

import { api } from "@/lib/api.client";

import type { ApiResponse } from "../_types/vehicle-type";

export async function getNextVehicleCodeApi(): Promise<ApiResponse<string>> {
  try {
    const response = await api.get<ApiResponse<string>>(
      "/3pl/next-vehicle-code",
    );
    return response;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      status: "error",
      message: error.message ?? "Failed to fetch next vehicle code",
      data: "",
    };
  }
}

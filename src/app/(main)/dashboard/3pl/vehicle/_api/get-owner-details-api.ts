"use server";

import { api } from "@/lib/api.client";

import type { ApiResponse } from "../_types/vehicle-type";

export interface OwnerDetails {
  id: number;
  name: string;
  address: string;
  contact_number: string;
  email: string;
}

export async function getOwnerDetailsApi(
  ownerId: string | number,
): Promise<ApiResponse<OwnerDetails>> {
  try {
    const response = await api.get<ApiResponse<OwnerDetails>>(
      `/3pl/vehicle-search-owner/${ownerId}`,
    );
    return response;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      status: "error",
      message: error.message ?? "Failed to fetch owner details",
      data: {} as any,
    };
  }
}

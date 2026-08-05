"use server";

import { api } from "@/lib/api.client";

import type {
  GetVehicleParams,
  VehicleApiResponse,
} from "../_types/vehicle-type";

export async function getVehicleApi(
  params: GetVehicleParams,
): Promise<VehicleApiResponse> {
  try {
    const queryParams = { ...params };
    if (!queryParams.search) delete queryParams.search;
    if (!queryParams.vehicle_no) delete queryParams.vehicle_no;
    if (!queryParams.captain) delete queryParams.captain;

    const response = await api.get<VehicleApiResponse>("/3pl/vehicle", {
      params: queryParams,
    });

    return response;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }

    return {
      status: "error",
      message: error.message ?? "Failed to fetch employees",
      data: {
        vehicle: [],
        pagination: {
          current_page: 1,
          from: 1,
          last_page: 1,
          links: [],
          path: "",
          per_page: params.per_page ?? 10,
          to: 1,
          total: 0,
        },
        counts: {
          all_vehicle: 0,
          no_of_vehicle_assigned: 0,
          no_of_vehicle_free: 0,
        },
      },
    };
  }
}

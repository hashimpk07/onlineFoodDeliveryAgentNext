"use server";

import { api } from "@/lib/api.client";

import { VehicleStatusChangeResponse } from "../_types/vehicle-type";

export async function changeVehicleStatusApi(
  id: number | string,
): Promise<VehicleStatusChangeResponse> {
  const res = await api.get<VehicleStatusChangeResponse>(
    `/3pl/vehicles-status-change/${id}`,
  );
  return res;
}

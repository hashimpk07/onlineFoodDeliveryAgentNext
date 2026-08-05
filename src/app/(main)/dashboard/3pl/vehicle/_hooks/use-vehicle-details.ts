"use client";

import { useQuery } from "@tanstack/react-query";

import { getVehicleDetailsApi } from "../_api/get-vehicle-details-api";

export function useVehicleDetails(id: string | number) {
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicleDetailsApi(id),
    enabled: !!id,
  });
}

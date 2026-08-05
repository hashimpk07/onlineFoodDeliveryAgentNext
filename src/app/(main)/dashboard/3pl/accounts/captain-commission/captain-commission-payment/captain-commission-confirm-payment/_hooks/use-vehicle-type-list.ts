"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchVehicleTypesData } from "../_api/get-vehicle-type";

export function useVehicleTypeList() {
  return useQuery({
    queryKey: ["vehicle-type"],
    queryFn: fetchVehicleTypesData,
    select: (data) =>
      data.map((vehicleType) => ({
        label: vehicleType.name,
        value: String(vehicleType.id),
      })),
  });
}

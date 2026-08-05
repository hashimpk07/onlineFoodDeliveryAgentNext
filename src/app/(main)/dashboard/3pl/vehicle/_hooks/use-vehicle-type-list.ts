"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchVehicleTypeData } from "../_api/get-vehicle-type";

export function useVehicleTypeList() {
  return useQuery({
    queryKey: ["vehicle_type"],
    queryFn: fetchVehicleTypeData,
    select: (data) =>
      data.map((type) => ({
        label: type.name,
        value: String(type.id),
      })),
  });
}

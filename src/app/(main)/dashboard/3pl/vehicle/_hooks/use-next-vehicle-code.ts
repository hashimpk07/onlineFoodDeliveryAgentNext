"use client";

import { useQuery } from "@tanstack/react-query";

import { getNextVehicleCodeApi } from "../_api/get-next-vehicle-code-api";

export function useNextVehicleCode(enabled: boolean = true) {
  return useQuery({
    queryKey: ["next-vehicle-code"],
    queryFn: getNextVehicleCodeApi,
    enabled,
  });
}

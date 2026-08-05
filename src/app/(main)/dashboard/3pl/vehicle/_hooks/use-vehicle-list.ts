"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getVehicleApi } from "../_api/vehicle-api";

import { useVehicleParams } from "./use-vehicle-params";

import type { VehicleApiResponse } from "../_types/vehicle-type";

export function useVehicleLists() {
  const { filters, page, pageSize, setPage, setPageSize } = useVehicleParams();

  const vehicleQuery = useQuery<VehicleApiResponse["data"]>({
    queryKey: ["vehicle", filters, page, pageSize],
    queryFn: async () => {
      const res = await getVehicleApi({
        vehicle_no: filters.vehicleNo,
        captain: filters.captain,
        status: filters.status,
        vehicle_type: filters.type,
        region: filters.regionId,
        owner: filters.ownerId,
        page,
        per_page: pageSize,
      });
      if (res.status === "error") {
        throw new Error(res.message);
      }

      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 0,
  });

  return {
    vehicle: vehicleQuery.data?.vehicle ?? [],
    pagination: vehicleQuery.data?.pagination ?? null,
    counts: vehicleQuery.data?.counts ?? null,
    isLoading: vehicleQuery.isFetching || vehicleQuery.isLoading,
    loading: vehicleQuery.isLoading || vehicleQuery.isFetching,
    page,
    pageSize,
    setPage,
    setPageSize,
  };
}

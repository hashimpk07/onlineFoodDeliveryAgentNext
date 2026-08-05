/* eslint-disable */
"use client";

import { useVehicleList } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_hooks/use-vehicle-types";
import { FilterVehicleType } from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/api";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface VehicleTypeAssignmentProps {
  vehicleTypes?: FilterVehicleType[];
  isEdit: boolean;
}

export function VehicleTypeAssignment({
  vehicleTypes,
  isEdit,
}: VehicleTypeAssignmentProps) {
  const form = useFormContext();

  // Watch vehicle type changes
  const vehicleTypeValue = form.watch("type_of_vehicle");

  // Convert array to string if needed
  const selectedVehicleType = Array.isArray(vehicleTypeValue)
    ? vehicleTypeValue[0] || ""
    : vehicleTypeValue || "";

  // Convert array to string on mount (for edit mode compatibility)
  useEffect(() => {
    if (Array.isArray(vehicleTypeValue) && vehicleTypeValue.length > 0) {
      form.setValue("type_of_vehicle", vehicleTypeValue[0]);
    }
  }, []); // Run only on mount

  // Fetch vehicles based on selected vehicle type - FIXED: Pass as object
  const {
    data: vehicles,
    isLoading,
    isFetching,
  } = useVehicleList({ vehicle_type: selectedVehicleType, isEdit });

  // Show loading if either initial load or refetching
  const isLoadingVehicles = isLoading || isFetching;

  return (
    <>
      {/* Type of Vehicle */}
      <FormField
        control={form.control}
        name="type_of_vehicle"
        render={({ field }) => (
          <FormItem>
            <SearchableSelect
              label="Type of Vehicle"
              value={
                Array.isArray(field.value)
                  ? field.value[0] || ""
                  : field.value || ""
              }
              placeholder="Select vehicle type"
              options={
                vehicleTypes?.map((vehicle: FilterVehicleType) => ({
                  id: vehicle.id.toString(),
                  label: vehicle.name,
                })) ?? []
              }
              onChange={(value) => {
                field.onChange(value);
                // Reset vehicle when type changes
                form.setValue("vehicle", "");
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Vehicle */}
      <FormField
        control={form.control}
        name="vehicle"
        render={({ field }) => (
          <FormItem>
            <SearchableSelect
              label="Vehicle"
              value={field.value || ""}
              placeholder={
                !selectedVehicleType || selectedVehicleType === ""
                  ? "Select vehicle type first"
                  : isLoadingVehicles
                    ? "Loading vehicles..."
                    : vehicles && vehicles.length === 0
                      ? "No vehicles available"
                      : "Select vehicle"
              }
              loading={isLoadingVehicles}
              options={
                vehicles && vehicles.length > 0
                  ? vehicles.map((vehicle: any) => ({
                      id: vehicle.id.toString(),
                      label: vehicle.number,
                    }))
                  : []
              }
              onChange={field.onChange}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

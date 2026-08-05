"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createVehicleApi } from "../_api/vehicle-create-api";
import { VehicleFormValues } from "../_types/vehicle-type";

export function useCreateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VehicleFormValues) => {
      const formData = new FormData();

      // Append text fields
      Object.entries(data).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          !(value instanceof FileList)
        ) {
          formData.append(key, String(value));
        }
      });

      // Append files
      if (data.rc_file?.[0]) {
        formData.append("rc_book", data.rc_file[0]);
      }
      if (data.insurance_file?.[0]) {
        formData.append("insurance", data.insurance_file[0]);
      }
      if (data.vehicle_images) {
        Array.from(data.vehicle_images).forEach((file) => {
          formData.append("vehicle_images[]", file as File);
        });
      }

      return createVehicleApi(formData);
    },
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message ?? "Vehicle created successfully");
        queryClient.invalidateQueries({ queryKey: ["vehicle"] });
      } else {
        toast.error(res.message ?? "Failed to create vehicle");
      }
    },
    onError: (error: any) => {
      toast.error(
        error.message ?? "Something went wrong while creating vehicle",
      );
    },
  });
}

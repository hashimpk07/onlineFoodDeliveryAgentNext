"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { changeVehicleStatusApi } from "../_api/vehicle-status-api";

export function useVehicleStatusChange() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number | string) => changeVehicleStatusApi(id),

    onSuccess: (res) => {
      if (res.status !== "success") {
        toast.error(res.message ?? "Something went wrong");
        return;
      }

      toast.success("Status changed successfully");

      queryClient.invalidateQueries({
        queryKey: ["vehicle"],
        exact: false,
      });
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return {
    changeStatus: mutation.mutate,
    isPending: mutation.isPending,
  };
}

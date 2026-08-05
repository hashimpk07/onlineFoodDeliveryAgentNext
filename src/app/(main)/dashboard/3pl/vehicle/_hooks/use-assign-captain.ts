"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { assignCaptainApi } from "../_api/vehicle-assign-captain-api";

export function useAssignCaptain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignCaptainApi,

    onSuccess: (res) => {
      if (res.status !== "success") {
        toast.error(res.message);
        return;
      }
      toast.success(res.message, {
        description: res.data,
      });
      queryClient.invalidateQueries({
        queryKey: ["vehicle"],
        exact: false,
      });
    },

    onError: () => {
      toast.error("Failed to assign captain");
    },
  });
}

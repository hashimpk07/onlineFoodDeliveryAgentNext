"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { changeEmployeeStatusApi } from "@/app/[locale]/(main)/dashboard/3pl/employee/_api/employee-status-api";

export function useEmployeeStatusChange() {
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: (id: number | string) => changeEmployeeStatusApi(id),

    onSuccess: (res) => {
      if (res.status === "error") {
        toast.error(res.message);
        return;
      }
      if (res.status === "fail") {
        toast.error(res.message ?? "Validation failed");
        return;
      }

      toast.success("Status changed successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  return {
    statusEmployees: statusMutation.mutate,
    isPending: statusMutation.isPending,
    errors: statusMutation.data?.errors,
    isSuccess: statusMutation.data?.status === "success",
    serverErrors:
      statusMutation.data?.errors ??
      (statusMutation.error as any)?.response?.data?.errors,
  };
}

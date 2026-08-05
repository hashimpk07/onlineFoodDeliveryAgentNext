"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createOrderApi,
  CreateOrderIndexedPayload,
} from "@/app/[locale]/(main)/dashboard/client/orders/_api/create-order";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation({
    mutationFn: (payload: CreateOrderIndexedPayload) => createOrderApi(payload),

    onSuccess: (res) => {
      if (res.status === "error") {
        toast.error(res.message);
        return;
      }
      if (res.status === "fail") {
        toast.error(res.message ?? "Validation failed");
        return;
      }

      toast.success("Order created successfully");

      queryClient.invalidateQueries({ queryKey: ["order"] });
      queryClient.invalidateQueries({ queryKey: ["order-status-card"] });
    },
    onError: (error) => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  return {
    createOrder: createOrderMutation.mutate,
    creatingOrder: createOrderMutation.isPending,
    createOrderErrors: createOrderMutation.data?.errors,
    isSuccess: createOrderMutation.data?.status === "success",
    serverErrors:
      createOrderMutation.data?.errors ??
      (createOrderMutation.error as any)?.response?.data?.errors,
  };
}

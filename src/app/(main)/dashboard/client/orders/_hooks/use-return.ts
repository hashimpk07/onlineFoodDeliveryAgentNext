"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { declineReturnOrder } from "@/app/[locale]/(main)/dashboard/client/_modal/_api/order-return";

type DeclineReturnPayload = {
  orderId: string;
  reason: string;
};

export function useReturnOrder() {
  const queryClient = useQueryClient();

  const returnOrderMutation = useMutation({
    mutationFn: (payload: DeclineReturnPayload) => declineReturnOrder(payload),

    onSuccess: (res) => {
      if (res.status === "error") {
        toast.error(res.message);
        return;
      }

      toast.success("Return order declined successfully");

      queryClient.invalidateQueries({ queryKey: ["order"] });
      queryClient.invalidateQueries({ queryKey: ["order-status-card"] });
    },

    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  return {
    declineReturn: returnOrderMutation.mutateAsync,
    decliningReturn: returnOrderMutation.isPending,
    isSuccess: returnOrderMutation.data?.status === "success",
    serverErrors: (returnOrderMutation.error as any)?.response?.data?.errors,
  };
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { acceptReturnOrder } from "@/app/[locale]/(main)/dashboard/client/_modal/_api/order-return";

type DeclineReturnPayload = {
  orderId: string;
};

export function useAcceptReturnOrder(onAccept: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: string | number) => acceptReturnOrder(orderId),

    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success("Return order accepted");
        onAccept();

        queryClient.invalidateQueries({ queryKey: ["order"] });
        queryClient.invalidateQueries({ queryKey: ["order-status-card"] });
      } else {
        toast.error(res.message ?? "Something went wrong");
      }
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });
}

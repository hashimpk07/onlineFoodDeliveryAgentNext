"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateOrderPayment } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_api/update-payment-details";
import { UpdatePaymentData } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_types/api";

type UpdatePaymentVariables = {
  order_id: string;
  data: UpdatePaymentData;
};

export function useUpdatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ order_id, data }: UpdatePaymentVariables) =>
      updateOrderPayment(order_id, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch order payment data
      queryClient.invalidateQueries({
        queryKey: ["order-payment", variables.order_id],
      });

      toast.success("Payment updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to update payment");
      console.error("Payment update error:", error);
    },
  });
}

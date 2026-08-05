import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { cancelOrder } from "@/app/[locale]/(main)/dashboard/client/_modal/_api/order-update";
import { ApiResponse } from "@/app/[locale]/(main)/dashboard/client/order-report/_types/order-report-type";

import { fetchCancellationReasons } from "../_api/order-cancellation";

export function useCancellationReasons() {
  return useQuery({
    queryKey: ["order-cancellation-reasons"],
    queryFn: fetchCancellationReasons,
  });
}

export type CancelOrderPayload = {
  orderId: string;
  status_id: number;
  note: string;
  from_client: number;
  reason_id: number;
};

export function useCancelOrder(id: string) {
  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation<
    ApiResponse<null>, // TData
    Error, // TError
    CancelOrderPayload // TVariables
  >({
    mutationFn: cancelOrder,

    onSuccess: (res) => {
      if (res.status === "error") {
        toast.error(res.message);
        return;
      }

      // if (res.status === "fail") {
      //   toast.error(res.message ?? "Cancellation failed");
      //   return;
      // }

      toast.success("Order cancelled successfully");

      queryClient.invalidateQueries({ queryKey: ["order"] });
      queryClient.invalidateQueries({ queryKey: ["order-status-card"] });
      queryClient.invalidateQueries({
        queryKey: ["client-view", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["order-cancellation-reasons"],
      });
      queryClient.invalidateQueries({
        queryKey: ["client-view", id],
      });
    },

    onError: (err) => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  return {
    cancelOrder: cancelOrderMutation.mutateAsync,
    cancellingOrder: cancelOrderMutation.isPending,
    isSuccess: cancelOrderMutation.data?.status === "success",
    serverErrors:
      cancelOrderMutation.data?.errors ??
      (cancelOrderMutation.error as any)?.response?.data?.errors,
  };
}

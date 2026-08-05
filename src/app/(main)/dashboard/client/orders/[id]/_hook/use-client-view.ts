"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  ordersClientView,
  ordersClientViewUpdateNotes,
} from "@/app/[locale]/(main)/dashboard/client/orders/[id]/_api/view-client-api";
import { OrderClientViewData } from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";

export function useOrdersClientView(id: string) {
  const query = useQuery<OrderClientViewData>({
    queryKey: ["client-view", id],
    queryFn: () => ordersClientView(id),
    enabled: !!id,
  });

  const queryClient = useQueryClient();

  const createNotes = useMutation({
    mutationFn: (note: string) => ordersClientViewUpdateNotes(id, note),

    onSuccess: () => {
      toast.success("Notes updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["client-view", id],
      });
    },

    onError: (err) => {
      toast.error("Failed to update notes. Please try again.");
    },
  });

  return {
    notesUpdate: createNotes.mutate,
    notesUpdating: createNotes.isPending,
    viewData: query.data,
    viewLoading: query.isLoading,
    viewError: query.isError,
    error: query.error,
  };
}

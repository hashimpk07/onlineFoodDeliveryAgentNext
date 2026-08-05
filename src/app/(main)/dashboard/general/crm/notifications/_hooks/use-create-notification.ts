"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createNotification } from "../_actions/create-notification";

import type { CreateNotificationPayload } from "../_types";

export function useCreateNotification(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sendableClass,
      payload,
    }: {
      sendableClass: string;
      payload: CreateNotificationPayload;
    }) => createNotification(sendableClass, payload),
    onSuccess: async (res) => {
      if (res.status === "error") {
        toast.error(res.message);
        return;
      }
      toast.success(res.message ?? "Notification created successfully");
      await queryClient.invalidateQueries({ queryKey: ["crm-notifications"] });
      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to create notification");
    },
  });
}

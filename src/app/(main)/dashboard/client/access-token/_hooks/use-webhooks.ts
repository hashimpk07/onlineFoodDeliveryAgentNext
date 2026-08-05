"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getWebhooks,
  testWebhook,
  updateWebhook,
} from "@/app/[locale]/(main)/dashboard/client/access-token/_api/get-webhooks";
import { WebhookSettings } from "@/app/[locale]/(main)/dashboard/client/access-token/_types/webhook-types";

export function useWebhooks() {
  const query = useQuery<WebhookSettings>({
    queryKey: ["webhooks"],
    queryFn: getWebhooks,
    staleTime: 60 * 1000,
  });

  return {
    webhooks: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useUpdateWebhook() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateWebhook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
      toast.success("Webhook updated successfully");
    },
    onError: () => {
      toast.error("Failed to update webhook. Please try again.");
    },
  });

  return {
    updateWebhook: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
}

export function useTestWebhook() {
  const mutation = useMutation({
    mutationFn: testWebhook,
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Test webhook delivered successfully");
      } else {
        toast.error(
          result.message ?? "Webhook endpoint did not accept the test payload",
        );
      }
    },
    onError: () => {
      toast.error("Failed to send test webhook. Please try again.");
    },
  });

  return {
    testWebhook: mutation.mutate,
    isPending: mutation.isPending,
  };
}

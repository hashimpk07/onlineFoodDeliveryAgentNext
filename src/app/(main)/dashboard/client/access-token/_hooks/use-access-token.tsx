// "use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  AccessConfigData,
  AccessTokenCreate,
  AccessTokenRevoke,
} from "@/app/[locale]/(main)/dashboard/client/access-token/_api/access-token";

export function useAccessTokenConfig() {
  const query = useQuery({
    queryKey: ["access-token-config"],
    queryFn: async () => {
      const res = await AccessConfigData();

      if (res.status === "error") {
        throw new Error(res.message);
      }

      return res.data?.tokens;
    },
  });

  return {
    accessToken: query.data ?? [],
    isLoading: query.isLoading,
  };
}

export function useCreateAccessToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      return AccessTokenCreate(name);
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["access-token-config"],
      });
      toast.success("Access token created successfully");
    },

    onError: (error) => {
      console.error("Error creating access token:", error);
      toast.error(error.message || "Failed to create access token");
    },
  });
}

export function useDeleteAccessToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => AccessTokenRevoke(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["access-token-config"],
      });
      toast.success("Access token deleted successfully");
    },

    onError: (error) => {
      console.error("Error deleting access token:", error);
      toast.error(error.message || "Failed to delete access token");
    },
  });
}

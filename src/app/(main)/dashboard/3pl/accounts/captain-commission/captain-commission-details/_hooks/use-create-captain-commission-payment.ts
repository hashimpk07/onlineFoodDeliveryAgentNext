"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCaptainCommissionPaymentApi } from "../_api/captain-commission-details";

export function useCreateCaptainCommissionPayment(captainId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await createCaptainCommissionPaymentApi(captainId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["captain-commission-details", captainId],
      });
    },
  });
}

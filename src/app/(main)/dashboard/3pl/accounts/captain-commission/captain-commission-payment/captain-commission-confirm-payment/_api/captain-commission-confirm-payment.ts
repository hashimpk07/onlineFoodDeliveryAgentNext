"use server";
import { api } from "@/lib/api.client";

import type {
  BulkCaptainCommissionPaymentRequest,
  BulkCaptainCommissionPaymentResponse,
  CaptainCommissionConfirmPaymentResponse,
  GetCaptainCommissionConfirmPaymentParams,
} from "../_types/captain-commission-confirm-payment-type";

export async function getCaptainCommissionConfirmPaymentListApi(
  params?: GetCaptainCommissionConfirmPaymentParams,
): Promise<CaptainCommissionConfirmPaymentResponse> {
  const response = await api.get<CaptainCommissionConfirmPaymentResponse>(
    "/3pl/captain-commission-confirm-payments-list",
    { params },
  );
  return response;
}

export async function createCaptainCommissionPaymentApi(
  captainId: string,
  formData: FormData,
): Promise<any> {
  const response = await api.post<any>(
    `/3pl/captains/${captainId}/commission-payment`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response;
}

export async function createBulkCaptainCommissionPaymentApi(
  data: BulkCaptainCommissionPaymentRequest,
): Promise<BulkCaptainCommissionPaymentResponse> {
  const response = await api.post<BulkCaptainCommissionPaymentResponse>(
    "/3pl/captains-commission-payment",
    data,
  );
  return response;
}

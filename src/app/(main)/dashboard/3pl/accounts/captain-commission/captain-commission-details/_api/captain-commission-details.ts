"use server";
import { api } from "@/lib/api.client";

import type {
  CaptainCommissionDetailsCountResponse,
  CaptainCommissionDetailsResponse,
  CaptainCommissionPaymentApiResponse,
} from "../_types/captain-commission-details-type";

export async function getCaptainCommissionDetailsApi(
  id: string,
  params?: {
    page?: number;
    per_page?: number;
    from_date?: string;
    to_date?: string;
    status?: string;
    q?: string;
    client?: string;
    shop?: string;
  },
): Promise<CaptainCommissionDetailsResponse> {
  const response = await api.get<CaptainCommissionDetailsResponse>(
    `/3pl/captains/${id}/commissions/details`,
    { params },
  );
  return response;
}

export async function getCaptainCommissionDetailsCountApi(
  id: string,
  params?: {
    from_date?: string;
    to_date?: string;
    status?: string;
    q?: string;
    client?: string;
    shop?: string;
  },
): Promise<CaptainCommissionDetailsCountResponse> {
  const response = await api.get<CaptainCommissionDetailsCountResponse>(
    `/3pl/captains/${id}/commissions/count`,
    { params },
  );
  return response;
}

export async function createCaptainCommissionPaymentApi(
  captainId: string,
  formData: FormData,
): Promise<CaptainCommissionPaymentApiResponse> {
  const response = await api.post<CaptainCommissionPaymentApiResponse>(
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

"use server";

import { api } from "@/lib/api.client";

import type {
  ApiResponse,
  PaymentType,
} from "../_types/captain-commission-payments-type";

export async function fetchPaymentTypeData(): Promise<PaymentType[]> {
  const res = await api.get<ApiResponse<PaymentType[]>>("/public/payment-type");
  return res.data;
}

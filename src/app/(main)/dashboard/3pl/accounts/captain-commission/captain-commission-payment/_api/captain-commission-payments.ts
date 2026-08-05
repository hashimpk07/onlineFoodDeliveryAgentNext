"use server";

import { api } from "@/lib/api.client";

import type {
  CaptainCommissionPaymentApiResponse,
  GetCaptainCommissionPaymentParams,
} from "../_types/captain-commission-payments-type";

export async function getCaptainCommissionPaymentApi(
  params: GetCaptainCommissionPaymentParams,
): Promise<CaptainCommissionPaymentApiResponse> {
  try {
    const queryParams = { ...params };

    // Remove empty params
    Object.keys(queryParams).forEach((key) => {
      if (
        queryParams[key as keyof GetCaptainCommissionPaymentParams] ===
          undefined ||
        queryParams[key as keyof GetCaptainCommissionPaymentParams] === ""
      ) {
        delete queryParams[key as keyof GetCaptainCommissionPaymentParams];
      }
    });

    const response = await api.get<CaptainCommissionPaymentApiResponse>(
      "/3pl/captain-commission-payments",
      {
        params: queryParams,
      },
    );

    return response;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }

    return {
      status: "error",
      message: error.message ?? "Failed to fetch commission data",
      data: {
        data: [],
        pagination: {
          current_page: 1,
          from: 1,
          last_page: 1,
          links: [],
          path: "",
          per_page: params.per_page ?? 10,
          to: 0,
          total: 0,
        },
      },
    } as unknown as CaptainCommissionPaymentApiResponse;
  }
}

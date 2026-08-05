/* eslint-disable security/detect-object-injection */
"use server";

import { api } from "@/lib/api.client";

import type {
  CaptainCommissionResponse,
  GetCaptainCommissionParams,
} from "../_types/captain-commission-type";

export async function getCaptainCommissionApi(
  params: GetCaptainCommissionParams,
): Promise<CaptainCommissionResponse> {
  try {
    const { onDutyFrom, ...rest } = params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryParams: Record<string, any> = {
      ...rest,
      on_duty_from: onDutyFrom,
      work_status: params.workStatus,
      payment_status: params.paymentStatus,
    };

    Object.keys(queryParams).forEach((key) => {
      const typedKey = key as keyof GetCaptainCommissionParams;
      if (queryParams[typedKey] === undefined || queryParams[typedKey] === "") {
        delete queryParams[typedKey];
      }
    });

    const response = await api.get<CaptainCommissionResponse>(
      "/3pl/commission-list",
      { params: queryParams },
    );

    return response;
  } catch (error: any) {
    return {
      status: "error",
      message: error?.message ?? "Failed to fetch commission data",
      data: {
        capatian_commission: [],
        counts: {
          total_attended_orders: 0,
          total_commission: "0.00",
          average_commission: "0.00",
          total_paid_commission: "0.00",
          total_payable: "0.00",
        },
        pagination: {
          current_page: 1,
          from: 0,
          last_page: 1,
          per_page: params.pageSize ?? 10,
          to: 0,
          total: 0,
          path: "",
          links: [],
        },
      },
    };
  }
}

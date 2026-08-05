"use server";

import { api } from "@/lib/api.client";

import type {
  CommissionReportResponse,
  CommissionReportStatisticsResponse,
  GetCommissionReportParams,
} from "../_types/commission-reports-type";

export async function getCommissionReportsApi(
  params: GetCommissionReportParams,
): Promise<CommissionReportResponse> {
  try {
    const { ...rest } = params;

    const queryParams: Record<string, unknown> = {
      ...rest,
    };

    /* eslint-disable security/detect-object-injection */
    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key] === undefined || queryParams[key] === "") {
        delete queryParams[key];
      }
    });
    /* eslint-enable security/detect-object-injection */

    const response = await api.get<CommissionReportResponse>(
      "/general/reports/third-party-commission",
      { params: queryParams },
    );

    return response;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch third party commission report data";
    return {
      status: "error",
      message,
      data: {
        data: [],
        pagination: {
          current_page: 1,
          from: 0,
          last_page: 1,
          per_page: params.pageSize ?? 20,
          to: 0,
          total: 0,
          path: "",
          links: [],
        },
      },
    };
  }
}

export async function getCommissionReportStatisticsApi(
  params: GetCommissionReportParams,
): Promise<CommissionReportStatisticsResponse> {
  try {
    const { ...rest } = params;

    const queryParams: Record<string, unknown> = {
      ...rest,
    };

    /* eslint-disable security/detect-object-injection */
    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key] === undefined || queryParams[key] === "") {
        delete queryParams[key];
      }
    });
    /* eslint-enable security/detect-object-injection */

    const response = await api.get<CommissionReportStatisticsResponse>(
      "/general/reports/third-party-commission-count",
      { params: queryParams },
    );

    return response;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch third party commission report statistics";
    return {
      status: "error",
      message,
      data: {
        data: {
          attended_orders: 0,
          total_avg_commission: "0.00",
          total_commission: "0.00",
          total_payed_amount: "0.00",
          total_payable_commission: "0.00",
        },
      },
    };
  }
}

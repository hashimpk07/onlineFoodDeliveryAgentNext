"use server";

import { api } from "@/lib/api.client";

import type {
  GetReconciliationParams,
  ReconciliationApiResponse,
} from "../_types/reconciliation-type";

export async function getReconciliationApi(
  params: GetReconciliationParams,
): Promise<ReconciliationApiResponse> {
  try {
    const queryParams = { ...params };

    // Remove empty params
    Object.keys(queryParams).forEach((key) => {
      if (
        queryParams[key as keyof GetReconciliationParams] === undefined ||
        queryParams[key as keyof GetReconciliationParams] === ""
      ) {
        delete queryParams[key as keyof GetReconciliationParams];
      }
    });

    const response = await api.get<ReconciliationApiResponse>(
      "/3pl/reconciliation",
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
    } as unknown as ReconciliationApiResponse;
  }
}

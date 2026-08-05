"use server";

import { api } from "@/lib/api.client";

import type {
  CompanyEarningApiResponse,
  GetCompanyEarningParams,
} from "../_types/company-earning-type";

export async function getCompanyEarningApi(
  params: GetCompanyEarningParams,
): Promise<CompanyEarningApiResponse> {
  try {
    const queryParams = { ...params };

    // Remove empty params
    Object.keys(queryParams).forEach((key) => {
      if (
        queryParams[key as keyof GetCompanyEarningParams] === undefined ||
        queryParams[key as keyof GetCompanyEarningParams] === ""
      ) {
        delete queryParams[key as keyof GetCompanyEarningParams];
      }
    });

    const response = await api.get<CompanyEarningApiResponse>(
      "/3pl/company-earnings",
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
        count: {
          attended_orders: 0,
          avg_commission: "0.00",
          total_commission: "0.00",
          total_payed_commission: "0.00",
          payable_commission: "0.00",
        },
      },
    };
  }
}

"use server";

import { api } from "@/lib/api.client";

import type { EmployeeListResponse } from "../_types/employee-type";

interface GetEmployeesParams {
  page?: number;
  per_page?: number;
  search?: string;
}

export async function getEmployeesApi(
  params: GetEmployeesParams,
): Promise<EmployeeListResponse> {
  try {
    const queryParams = { ...params };
    if (!queryParams.search) {
      delete queryParams.search;
    }

    const response = await api.get<EmployeeListResponse>("/3pl/employee", {
      params: queryParams,
    });

    return response;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }

    return {
      status: "error",
      message: error.message ?? "Failed to fetch employees",
      data: {
        order: [],
        pagination: {
          current_page: 1,
          last_page: 1,
          per_page: params.per_page ?? 10,
          total: 0,
        },
      },
    };
  }
}

"use server";

import { api } from "@/lib/api.client";

import { EmployeeStatusResponse } from "../_types/employee-type";

export async function changeEmployeeStatusApi(
  id: number | string,
): Promise<EmployeeStatusResponse> {
  const res = await api.get<EmployeeStatusResponse>(
    `/3pl/employee-status-change/${id}`,
  );
  return res;
}

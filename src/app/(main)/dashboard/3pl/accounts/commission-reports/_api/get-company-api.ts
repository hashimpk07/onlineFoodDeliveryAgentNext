"use server";

import { api } from "@/lib/api.client";

interface Company {
  id: number;
  name: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}

export async function fetchCompanyData(): Promise<Company[]> {
  const res = await api.get<ApiResponse<Company[]>>("/public/3pl-companies");
  return res.data;
}

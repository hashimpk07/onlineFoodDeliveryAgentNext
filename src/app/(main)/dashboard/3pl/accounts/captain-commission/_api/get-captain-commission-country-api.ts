"use server";

import { api } from "@/lib/api.client";

import type { ApiResponse, Country } from "../_types/captain-commission-type";

export async function fetchCountryData(): Promise<Country[]> {
  const res = await api.get<ApiResponse<Country[]>>("/public/countries");
  return res.data;
}

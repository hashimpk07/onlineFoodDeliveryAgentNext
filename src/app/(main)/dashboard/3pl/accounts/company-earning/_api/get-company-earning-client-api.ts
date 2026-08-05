"use server";
import { api } from "@/lib/api.client";

import type { ApiResponse, Client } from "../_types/company-earning-type";

export async function fetchClientData(): Promise<Client[]> {
  return api.get<ApiResponse<Client[]>>("/public/clients").then((res) => {
    return res.data;
  });
}

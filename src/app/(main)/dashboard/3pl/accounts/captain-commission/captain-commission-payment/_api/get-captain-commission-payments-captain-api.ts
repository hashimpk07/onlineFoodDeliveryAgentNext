"use server";
import { api } from "@/lib/api.client";

import type {
  ApiResponse,
  Captain,
} from "../_types/captain-commission-payments-type";

export async function fetchCaptainData(): Promise<Captain[]> {
  return api
    .get<ApiResponse<Captain[]>>("/3pl/payment-captain-lits")
    .then((res) => {
      return res.data;
    });
}

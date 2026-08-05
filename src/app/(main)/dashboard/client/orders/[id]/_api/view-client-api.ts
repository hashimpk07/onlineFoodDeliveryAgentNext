"use server";

// order client view api,s

import { notFound } from "next/navigation";

import {
  ApiResponse,
  OrderClientViewData,
} from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";

export async function ordersClientView(
  id: string,
): Promise<OrderClientViewData> {
  try {
    return await api
      .get<ApiResponse<OrderClientViewData>>(`/client/order/${id}`)
      .then(unwrapResponse);
  } catch (error: any) {
    if (error.response?.status === 404) {
      notFound();
    }
    throw new Error(
      error.response?.data?.message ??
        error.message ??
        "Failed to fetch order view",
    );
  }
}

// notes

export async function ordersClientViewUpdateNotes(
  id: string,
  note: string,
): Promise<OrderClientViewData> {
  try {
    return await api
      .post<ApiResponse<OrderClientViewData>>(`public/orders/notes/${id}`, {
        note,
      })
      .then(unwrapResponse);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ??
        error.message ??
        "Failed to update notes",
    );
  }
}

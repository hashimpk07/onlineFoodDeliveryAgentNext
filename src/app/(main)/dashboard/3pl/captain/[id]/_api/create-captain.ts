"use server";

import {
  Asset,
  CaptainDetails,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_types/api";
import { api } from "@/lib/api.client";
import { withServerActionErrorHandling } from "@/lib/server-action-error-handler";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export const createCaptain = withServerActionErrorHandling(
  async (formData: any) => {
    const response = await api.post<ApiResponse<any[]>>(
      "/3pl/captain",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return unwrapResponse(response);
  },
);

export async function getAssetsByCategory(category_id: string) {
  return await api
    .get<ApiResponse<Asset[]>>("/public/asset-items", {
      params: {
        category_id: category_id,
      },
    })
    .then(unwrapResponse);
}

export async function getCaptainById(captain_id: number) {
  return await api
    .get<ApiResponse<CaptainDetails>>(`/3pl/captain/${captain_id}`, {
      params: {
        formatted: false,
      },
    })
    .then(unwrapResponse);
}

export const updateCaptain = withServerActionErrorHandling(
  async (id: string, formData: any) => {
    return api
      .post<ApiResponse<any[]>>(`/3pl/captain/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(unwrapResponse);
  },
);

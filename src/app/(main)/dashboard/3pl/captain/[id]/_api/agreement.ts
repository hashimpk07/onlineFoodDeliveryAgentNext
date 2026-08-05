"use server";

import { Agreement } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function generateCaptainAgreement(
  formData: any,
): Promise<Agreement> {
  return api
    .post<ApiResponse<Agreement>>("/public/captain/agreement", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(unwrapResponse);
}

export async function updateCaptainAgreement(
  formData: any,
  captain_id: number,
): Promise<Agreement> {
  return api
    .post<ApiResponse<Agreement>>(
      `/public/captain/update-agreement/${captain_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    )
    .then(unwrapResponse);
}

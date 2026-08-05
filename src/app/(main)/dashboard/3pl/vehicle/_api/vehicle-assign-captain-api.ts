"use server";

import {
  AssignCaptainPayload,
  AssignCaptainResponse,
} from "@/app/[locale]/(main)/dashboard/3pl/vehicle/_types/vehicle-type";
import { api } from "@/lib/api.client";

export async function assignCaptainApi(
  payload: AssignCaptainPayload,
): Promise<AssignCaptainResponse> {
  return api.post<AssignCaptainResponse>(
    "/3pl/vehicle-assign-captain",
    payload,
  );
}

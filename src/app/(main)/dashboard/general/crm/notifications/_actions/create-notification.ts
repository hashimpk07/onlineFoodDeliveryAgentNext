"use server";

import { api } from "@/lib/api.client";
import { ApiResponse } from "@/types/api";

import type { CreateNotificationPayload } from "../_types";

function extractErrorMessage(error: unknown): string {
  const err = error as {
    response?: { data?: { message?: string } };
    message?: string;
  };
  return (
    err.response?.data?.message ??
    err.message ??
    "Failed to create notification"
  );
}

export async function createNotification(
  sendableClass: string,
  payload: CreateNotificationPayload,
): Promise<ApiResponse<unknown>> {
  try {
    const res = await api.post<ApiResponse<unknown>>(
      `/general/crm/notifications/${sendableClass}/create`,
      payload,
    );
    return {
      status: res.status ?? "success",
      message: res.message ?? "Notification created successfully",
      data: res.data ?? null,
    };
  } catch (error: unknown) {
    return { status: "error", message: extractErrorMessage(error), data: null };
  }
}

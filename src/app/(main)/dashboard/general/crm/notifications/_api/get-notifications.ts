"use server";

import { api } from "@/lib/api.client";

import type {
  NotificationListParams,
  NotificationListResponse,
  Notification,
  Pagination,
} from "../_types";

interface RawSendableListResponse {
  status?: string;
  message?: string;
  data?: {
    sendable_types?: string[];
    sendable_list?: {
      data?: Notification[];
      pagination?: Pagination;
    };
  };
}

function normalizeResponse(
  res: RawSendableListResponse,
  page: number,
  per_page: number,
): NotificationListResponse {
  const sendableList = res.data?.sendable_list;
  const notifications = sendableList?.data ?? [];

  return {
    status: res.status ?? "success",
    message: res.message ?? "",
    data: {
      sendable_types: res.data?.sendable_types ?? [],
      notifications,
      pagination: sendableList?.pagination ?? {
        current_page: page,
        last_page: 1,
        per_page,
        total: notifications.length,
      },
    },
  };
}

function errorResponse(
  error: unknown,
  per_page: number,
): NotificationListResponse {
  const err = error as {
    response?: { data?: { message?: string } };
    message?: string;
  };

  return {
    status: "error",
    message:
      err.response?.data?.message ??
      err.message ??
      "Failed to fetch notifications",
    data: {
      sendable_types: [],
      notifications: [],
      pagination: { current_page: 1, last_page: 1, per_page, total: 0 },
    },
  };
}

export async function getNotifications(
  params?: NotificationListParams,
): Promise<NotificationListResponse> {
  const { page = 1, per_page = 20 } = params ?? {};

  try {
    const res = await api.get<RawSendableListResponse>(
      "/general/crm/notifications",
      { params: { page, per_page } },
    );
    return normalizeResponse(res, page, per_page);
  } catch (error: unknown) {
    return errorResponse(error, per_page);
  }
}

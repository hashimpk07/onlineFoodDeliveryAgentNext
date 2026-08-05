"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getNotifications } from "../_api/get-notifications";

import type {
  NotificationListParams,
  NotificationListResponse,
} from "../_types";

export function useNotifications(
  params: NotificationListParams,
  initialData?: NotificationListResponse,
) {
  return useQuery({
    queryKey: ["crm-notifications", params],
    queryFn: () => getNotifications(params),
    initialData,
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
}

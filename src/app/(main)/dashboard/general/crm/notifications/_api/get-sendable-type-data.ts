"use server";

import { api } from "@/lib/api.client";

import type { SendableClient, SendableTypeData } from "../_types";

interface RawSendableTypeResponse {
  status?: string;
  message?: string;
  data?: {
    class?: string;
    clients?: SendableClient[];
  };
}

export async function getSendableTypeData(
  sendableClass: string,
): Promise<SendableTypeData> {
  const res = await api.get<RawSendableTypeResponse>(
    `/general/crm/notifications/${sendableClass}/create`,
  );

  return {
    class: res.data?.class ?? sendableClass,
    clients: res.data?.clients ?? [],
  };
}

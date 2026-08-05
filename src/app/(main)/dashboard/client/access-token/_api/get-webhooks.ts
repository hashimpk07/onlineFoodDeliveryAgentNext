import { WebhookSettings } from "@/app/[locale]/(main)/dashboard/client/access-token/_types/webhook-types";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export type WebhookType = "status" | "captain_location" | "shop_status";

interface UpdateWebhookPayload {
  type: WebhookType;
  webhook_url: string | null;
  webhook_secret_key: string;
}

export interface TestWebhookResult {
  success: boolean;
  status?: number;
  body?: string;
  message?: string;
  payload?: Record<string, unknown>;
  adapter?: string;
}

export async function getWebhooks(): Promise<WebhookSettings> {
  return api
    .get<ApiResponse<WebhookSettings>>("/client/webhooks")
    .then(unwrapResponse);
}

export async function updateWebhook(
  payload: UpdateWebhookPayload,
): Promise<WebhookSettings> {
  return api
    .post<ApiResponse<WebhookSettings>>("/client/webhook/update", payload)
    .then(unwrapResponse);
}

export async function testWebhook(
  type: WebhookType,
): Promise<TestWebhookResult> {
  return api
    .post<ApiResponse<TestWebhookResult>>("/client/webhook/test", { type })
    .then(unwrapResponse);
}

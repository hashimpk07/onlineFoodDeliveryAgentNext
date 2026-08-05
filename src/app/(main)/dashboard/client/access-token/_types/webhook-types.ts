export interface Webhook {
  id: number;
  type: string;
  webhooks_url: string;
  access_token: string;
}

export interface WebhookSettings {
  webhook: Webhook;
  webhook_captain_location: Webhook;
  webhook_shop_status: Webhook;
}

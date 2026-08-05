export interface Notification {
  id: number;
  title: string;
  type: string;
  frequency: string;
  time: string;
  emails: string;
  created_at?: string;
  updated_at?: string;
}

export interface Pagination {
  current_page: number;
  from?: number;
  last_page: number;
  per_page: number;
  to?: number;
  total: number;
}

export interface NotificationListResponse {
  status: string;
  message: string;
  data: {
    sendable_types: string[];
    notifications: Notification[];
    pagination: Pagination;
  };
}

export interface NotificationListParams {
  page?: number;
  per_page?: number;
  search?: string;
}

export interface ClientShop {
  id: number;
  name: string;
}

export interface SendableClient {
  id: number;
  name: string;
  shops: ClientShop[];
}

export interface SendableTypeData {
  class: string;
  clients: SendableClient[];
}

export type ReportGenerationBy = "client_based" | "branch_based";

export interface CreateNotificationPayload {
  title: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  time: string;
  emails: string;
  cc_emails?: string;
  order_time_from: string;
  order_time_to: string;
  report_generation_by: ReportGenerationBy;
  clients?: number[];
  branch?: number[];
}

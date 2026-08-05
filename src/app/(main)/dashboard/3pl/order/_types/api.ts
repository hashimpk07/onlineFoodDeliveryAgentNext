import { Pagination } from "@/types/api";

export interface OrdersListResponse {
  order: Order[];
  pagination: Pagination;
}

export interface Order {
  id: number;
  order_id: string;
  client_id: string;
  client_name: string;
  shop_name: string;
  area: string;
  zone: string;
  amount: string;
  type: string;
  updated_at: string;
  status: string;
  timer?: {
    start_time?: string;
    end_time?: string;
  } | null;
}

export interface OrderStatusCounts {
  on_going_orders_count: number;
  complaints_orders_count: number;
  client_return_orders_count: number;
  request_for_cancel_orders_count: number;
}

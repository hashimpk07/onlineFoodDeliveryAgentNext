export type Order = {
  id?: string | number;
  order_id?: string;
  client_order_id?: string;
  order_type?: string;
  cod_amount?: string;
  client_name?: string;
  shop_name?: string;
  shop_zone?: string;
  shop_area?: string;
  shop_region?: string;
  captain?: string;
  assigned_by?: string;
  order_status?: string;
  cancellation_reason?: string;
  cancelled_by?: string;
  date?: string;
  created_at?: string;
  order_accepted_at?: string;
  order_accepted_time?: string;
  start_ride_at?: string;
  start_ride_time?: string;
  reached_shop_at?: string;
  reached_shop_time?: string;
  order_picked_at?: string;
  order_picked_time?: string;
  shipped_at?: string;
  shipped_time?: string;
  reached_dest_at?: string;
  reached_dest_time?: string;
  business_day?: string;
  final_status_at?: string;
  final_status_time?: string;
  acceptance_time?: string;
  arrival_time?: string;
  reached_time?: string;
  picked_time?: string;
  pickup_to_delivery_time?: string;
  process_time?: string;
  distance?: string;
};

export type Status = {
  id: string;
  name: string;
};

export type Captain = {
  captain_id: string;
  captain_name: string;
};

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface OrdersApiResponse {
  reports: PaginatedResponse<Order>;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
  errors?: Record<string, string[]>;
}

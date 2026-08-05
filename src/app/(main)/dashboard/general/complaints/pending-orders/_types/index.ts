export interface Pagination {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface PendingOrders {
  id: number;
  order_id: string;
  client_order_id: string;
  client_name: string | null;
  shop_name: string;
  area: string;
  zone: string;
  amount: string;
  delivery_type: string;
  updated_at: string;
  status: PendingOrderStatus;
  captain: PendingOrderCaptain | null;
  timer?: PendingOrderTimer | null;
  request_orderID: string;
}

export interface PendingOrderTimer {
  start_time: string | null;
  end_time: string | null;
}

export interface PendingOrderStatus {
  name: string;
  class: string;
}

export interface PendingOrderCaptain {
  name: string;
  phone_number: string;
}

export interface PendingOrdersListParams {
  page?: number;
  per_page?: number;
  zone?: string;
  captain?: string;
  from_date?: string;
  to_date?: string;
  shop_name?: string;
}

export interface PendingOrdersListData {
  orders: PendingOrders[];
  pagination: Pagination;
}

export interface PendingOrdersListResponse {
  status: string;
  message: string;
  data: PendingOrdersListData;
}

export interface ZoneNode {
  id: string;
  label: string;
  children?: ZoneNode[];
}

export interface Zone {
  id: string;
  name: string;
}

export interface ZoneResponse {
  status: string;
  message: string;
  data: ZoneNode[];
}

export interface Captain {
  id: number;
  name: string;
}

export interface CaptainResponse {
  status: string;
  message: string;
  data: {
    id: number;
    firstname: string;
  }[];
}

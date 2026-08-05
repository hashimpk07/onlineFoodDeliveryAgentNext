export interface DashboardStats {
  total_orders: number;
  delivered_orders: number;
  shipped: number;
  canceled: number;
  returned: number;
  pending: number;
}

export interface DashboardStatsResponse {
  status: "success" | "error";
  message: string;
  data: DashboardStats;
}

export type Order = {
  id?: number;
  order_id: string;
  client_order_id: string;
  shopname: string;
  area?: string;
  zone?: string;
  status?: OrderStatus;
  message?: string;
  amount?: string;
  delivery_charge?: string;
  order_date?: string;
  return_origin_reason?: string;
  captain?: { name?: string; phone?: string };
  actions?: any;
};

export interface OrderStatusGraphResponse {
  status: "success" | "error";
  message: string;
  data: Order[];
}

export interface MonthlyData {
  month: string;
  value: number;
}

export const STATUS_COLORS: Record<string, string> = {
  "Assign Attempts": "#5FAF73",
  "Cancel Request Accepted": "#6E7A42",
  Canceled: "#5E1B8A",
  "Captain Order Reject": "#B85C8A",
  "Client Return Accepted": "#0E8F5E",
  Delivered: "#3E5FB8",
  "Order Accept": "#8F2D00",
  Pending: "#9B1D9B",
  "Request For Cancel": "#6E550C",
};

export const COLORS = [
  "#3b82f6", // blue
  "#22c55e", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#ec4899", // pink
  "#84cc16", // lime
  "#f97316", // orange
  "#14b8a6", // teal
  "#eab308", // yellow
  "#6366f1", // indigo
];

export interface DashboardResponse {
  status: string;
  message: string;
  data: DashboardStats;
}

export type Shop = {
  id: number;
  name: string;
  clinet_id: number;
  time_slots: {
    id: number;
    start_time: string;
    end_time: string;
    close_before: string | null;
    name: string;
  }[];
  delivery_types: DeliveryType[];
  require_delivery_location?: number;
};

export interface ShopsData {
  shops: Shop[];
}

export type Status = {
  id: number;
  name: string;
  name_ar: string | null;
};

export interface OrdersPagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface OrdersApiResponse {
  orders: Order[];
  pagination: OrdersPagination;
}

// export interface ApiResponse<T> {
//   status: "success" | "error";
//   message: string;
//   data: T;
//   tokens?: T;
// }

export type ApiResponse<T> =
  | {
      status: "success";
      message: string;
      data: T;
    }
  | {
      status: "error";
      message: string;
    };

export interface OrdersHttpResponse {
  data: OrdersApiResponse;
  status: string;
  message?: string;
}

export interface OrdersSummaryCardsProps {
  total_orders: string;
  delivered_orders: string;
  pending_orders: string;
  canceled_orders: string;
  returned_orders: string;
  on_going_orders_count: string;
  ticket_raised_orders_count: string;
  new_orders_count: string;
  pending_orders_count: string;
  client_request_orders_count: string;
  client_return_orders_count: string;
  client_cancel_orders_count: string;
}

export type OrderLog = {
  id: number;
  order_id: number;
  captain_id: number | null;
  note: string | null;
  created_at?: string;
  created_by: string;
  status: string;
  datetime: string;
};

export type ClientView = {
  shopname?: string | null;
  client_order_id?: string | null;
  created_at?: string | null;
  delivery_time?: string | null;

  customer_name?: string | null;
  customer_number?: string | null;
  email?: string | null;
  address?: string | null;

  code?: string | null;
  delivery_payment_mode?: string | null;

  amount?: string | null;
  delivery_charge?: string | null;
  items?: string | null;
  order_id?: string | null;
  status?:
    | string
    | {
        name?: string | null;
      }
    | null;

  captain?: {
    name?: string | null;
  } | null;
  logs_execpt?: OrderLog[];
};

export interface DeliveryType {
  id: number;
  name: string;
}

export interface Client {
  id: number;
  name: string;
  shops: Shop[];
  delivery_types: DeliveryType[];
  time_slots: string;
}

export interface ClientsShopsResponse {
  clients: Client[];
  shops: Shop[];
}

export function toArray<T>(value: T[] | Record<string, T> | undefined): T[] {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return Object.values(value);
  return [];
}

export type OrderProgress = {
  id: number;
  name?: string;
};

export type OrderActions = {
  can_cancel: boolean;
  can_update?: boolean;
};

export type OrderCaptain = {
  id?: number;
  name?: string;
  phone?: string;
};

export type OrderStatus =
  | string
  | {
      id?: number;
      name?: string;
    };

export type OrderItem = {
  id?: number;
  product_name?: string;
  quantity?: number;
  amount?: number;
  total?: number;
};

// export type OrderClientViewData = {
//   /** Core identifiers */
//   id: string;
//   order_id: number;
//   code: string;
//   client_order_id?: string;

//   /** Dates */
//   created_at: string;
//   delivery_time?: string;

//   /** Customer */
//   customer_name?: string;
//   customer_number?: string;
//   email?: string;
//   address?: string;

//   /** Order state */
//   progress?: OrderProgress;
//   actions?: OrderActions;
//   status?: OrderStatus;

//   /** Delivery */
//   delivery_payment_mode?: string;
//   captain?: OrderCaptain;

//   /** Details */
//   items?: OrderItem[];
//   logs_execpt?: OrderLog[];

//   /** Amounts */
//   delivery_charge?: number | string;
//   amount?: number | string;

//   shops: Shop[];
// };

export type OrderClientViewData = {
  /** Core identifiers */
  id: string;
  order_id: number;
  code: string;
  client_order_id?: string;

  notes: any[];

  /** Dates */
  created_at: string;
  delivery_time?: string;

  /** Customer */
  customer_name?: string;
  customer_number?: string;
  email?: string;
  address?: string;

  /** Order state */
  progress?: OrderProgress;
  actions?: OrderActions;
  status?: OrderStatus;

  /** Delivery */
  delivery_payment_mode?: string;
  captain?: OrderCaptain;

  /** Details */
  items?: OrderItem[];
  logs?: OrderLog[];

  /** Amounts */
  delivery_charge?: number | string;
  amount?: number | string;
  message: string;
};

export type orderFilters = {
  fromDate?: string;
  toDate?: string;
  shopId?: string;
  statusId?: string[];
  page?: number;
  pageSize?: number;
};

export interface OrderDetailsResponse {
  shipping_information: ShippingInformation;
  billing_information: BillingInformation;
  delivery_info: DeliveryInfo;
  log_info: LogInfo;
  order_notes: any[]; // adjust if structure is known
  item_order: any[]; // adjust if structure is known
  delivery_charges: string;
  payable_amount: string;
}

export interface ShippingInformation {
  client_name: string;
  shop: string;
  client_order_id: string;
  order_date: string;
  delivery_type: string;
}

export interface BillingInformation {
  customer_name: string | null;
  customer_number: string;
  customer_email: string | null;
  customer_address: string;
}

export interface DeliveryInfo {
  order_id: string;
  payment_mode: string;
  status: string;
  captain_name: string;
  captain_mobile_number: string;
}

export interface LogInfo {
  logs: LogItem[];
}

export interface LogItem {
  status_id: number;
  status: string;
  created_by: string;
  datetime: string;
  note: string;
}

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

export interface OrderStatusGraphItem {
  label: string;
  value: number;
}

export interface OrderStatusGraphResponse {
  status: "success" | "error";
  message: string;
  data: OrderStatusGraphItem[];
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

export interface DashboardStats {
  total_orders: number;
  delivered_orders: number;
  shipped: number;
  canceled: number;
  returned: number;
  pending: number;
}

export interface DashboardResponse {
  status: string;
  message: string;
  data: DashboardStats;
}

export interface MonthlyOrderStatusResponse {
  status: "success" | "error";
  message: string;
  data: MonthlyData[];
}

export interface AreaFilter {
  id: number;
  name: string;
  quadrant_name: string;
}

export interface DashboardStatsResponse {
  total_orders: number;
  total_hours: number;
  avg_orders_per_hr: number;
  delivery_success: number;
  statuses: StatusCount[];
  online_captains: number;
  offline_captains: number;
}

export interface StatusCount {
  name: string;
  count: number;
}
export interface CaptainsChartResponse {
  colors: string[];
  labels: string[];
  values: number[];
}

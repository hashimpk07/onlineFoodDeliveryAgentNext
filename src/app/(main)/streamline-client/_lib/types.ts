import {
  Clock,
  DatabaseBackup,
  LucideIcon,
  MessageSquare,
  PackagePlus,
  SquareX,
  Truck,
} from "lucide-react";

export type CaptainMetrics = {
  completed: number;
  active: number;
  failed: number;
};

export type CaptainProperties = {
  id?: string;
  name?: string;
  code?: string;
  phone?: string;
  status?: string;
  region?: string;
  employmentType?: string;
  metrics?: Partial<CaptainMetrics>;
};

export type CaptainFeature = {
  properties: CaptainProperties;
};

export type CaptainsApiResponse = {
  captains: {
    features: CaptainFeature[];
  };
  statistic?: {
    all: number;
    free: number;
    busy: number;
    offline: number;
  };
};

/**
 * Final UI-ready Captain model
 */
export type Captain = {
  id: string;
  name: string;
  code: string;
  phone: string;
  status: string;
  region: string;
  employmentType: string;
  metrics: CaptainMetrics;
};

export type FilterOption = {
  id: number | string;
  text: string;
};

export type NamedFilterOption = {
  id: number | string;
  name: string;
};

export type OrderFilters = {
  regions?: FilterOption[];
  areas?: FilterOption[];
  shops?: FilterOption[];
  clients?: FilterOption[];
};

export type CaptainFilters = {
  employment_types?: NamedFilterOption[];
  companies?: FilterOption[];
};

export type OrderStatisticItem = {
  class: string;
  count: number;
};

export type OrderStatistics = {
  auto_assign_orders: OrderStatisticItem;
  cancel_request_orders: OrderStatisticItem;
  client_chat_orders: OrderStatisticItem;
  client_return_orders: OrderStatisticItem;
  new_orders: OrderStatisticItem;
  on_going_orders: OrderStatisticItem;
  pending_orders: OrderStatisticItem;
  ticket_orders: OrderStatisticItem;
  schedule_orders: OrderStatisticItem;
};

export type FilterItem = {
  id: number;
  text: string;
};

export type CaptainEmploymentType = {
  id: number;
  name: string;
};

export type CaptainCompany = {
  id: number;
  text: string;
};

export type OrdersApiResponse = {
  orders: unknown[]; // replace later with real order type
};

export type FiltersApiResponse = {
  filters?: OrderFilters;
  captain_filters?: CaptainFilters;
};

export interface MapStatusFilters {
  label: string;
  count: number;
  icon: LucideIcon;
  color: string;
  key: string;
}
export const FILTER_CONFIG: Record<
  string,
  { icon: LucideIcon; color: string }
> = {
  "New Orders": { icon: PackagePlus, color: "text-green-400" },
  "On Going Orders": { icon: Truck, color: "text-blue-400" },
  "Pending Orders": { icon: Clock, color: "text-yellow-600" },
  "Client Return Orders": { icon: DatabaseBackup, color: "text-orange-600" },
  "Cancel Request Orders": { icon: SquareX, color: "text-rose-600" },
  "Client Chat Orders": { icon: MessageSquare, color: "text-orange-600" },
};

export interface OrderListItem {
  id: number;
  client_order_id: string | null;
  status: string;
  shop_name: string | null;
  captain_name: string | null;
  shop_region: string | null;
  created_formatted_at: string;
  shop_area: string | null;
  client_name: string | null;
  time_left: string;
  has_complaint: boolean;
  assign_attempts_count: number;
  location?: {
    lat: number | null;
    lng: number | null;
  };
  shop_id: number | null;
  delivery_location?: {
    lat: number | null;
    lng: number | null;
  };
  before_reached_shop?: boolean;
  captain_location: {
    lat: number | null;
    lng: number | null;
  } | null;
}

export interface StreamlineCaptain {
  location: string;
  role: string;
  id: number;
  name: string;
  phone_number: string;
  vehicle_type_id: number;
  current_order_count: number;
  delivered_orders_count: number;
  profile_pic_path: string;
  online_state: string;
  current_order: CaptainCurrentOrder[];
  regions: string[];
  employment_type: string;
  third_party_company: string;
  icon: string;
  current_shift_started_at: string | null; // ISO date string
  eta: number;
  geometry: Geometry | null;
  vehicle_type: string | "bike" | "van";
  assigned?: boolean;
  nationality?: string;
}

export interface CaptainCurrentOrder {
  id: number;
  client_order_id: string;
  client: string;
  shop: string;
}

export interface Geometry {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface CaptainsData {
  captains: StreamlineCaptain[];
}

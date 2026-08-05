import {
  Clock,
  DatabaseBackup,
  LucideIcon,
  PackagePlus,
  SquareX,
  Truck,
} from "lucide-react";

// new start from here

export const FILTER_CONFIG: Record<
  string,
  { icon: LucideIcon; color: string }
> = {
  "New Orders": { icon: PackagePlus, color: "text-green-400" },
  "On Going Orders": { icon: Truck, color: "text-blue-400" },
  "Pending Orders": { icon: Clock, color: "text-yellow-600" },
  "Client Return Orders": { icon: DatabaseBackup, color: "text-orange-600" },
  "Cancel Request Orders": { icon: SquareX, color: "text-rose-600" },
};

export interface MapStatusFilters {
  label: string;
  count: number;
  icon: LucideIcon;
  color: string;
  key: string;
}

export interface StreamlineCaptain {
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

export interface CaptainOrder {
  id: number;
  client_order_id: string;
  shop: string;
  client: string;
  status: string;
  created_at: string;
  shop_to_delivery_km: string | null;
  location: string;
}

export interface CaptainTaskHistory {
  total_orders: number;
  total_accepted: number;
  total_declined: number;
  missed_orders: number;
}

export interface CaptainDetailsData {
  id: number;
  code: string;
  name: string;
  current_orders: CaptainOrder[];
  task_history: CaptainTaskHistory;
}

export interface CaptainDetailsDataResponse {
  captain: CaptainDetailsData;
}

export interface OrderListItemResponse {
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

export interface CaptainsListResponse {
  captains: StreamlineCaptain[];
}

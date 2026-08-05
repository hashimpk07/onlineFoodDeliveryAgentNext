import { Pagination } from "@/types/api";

export interface CaptainsListResponse {
  captains: Captain[];
  pagination: Pagination;
}

export interface Captain {
  id: number;
  code: string;
  captain_name: string;
  mobile_no: string;
  nationality: string;
  total_delivery: number;
  region: string;
  area: string;
  priority: string;
  work_status: string;
  shift_status: string;
  vehicle_type: string;
  vehicle_number: string;
  app_version: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface FilterCaptain {
  id: number;
  firstname: string;
}

export interface FilterVehicleType {
  id: number;
  name: string;
}

export interface AreaFilter {
  id: number;
  name: string;
  quadrant_name: string;
}

export interface RegionsFilter {
  id: number;
  name: string;
}

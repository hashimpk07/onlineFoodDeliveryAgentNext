export interface Vehicle {
  id: number;
  code: string;
  type: "CAR" | "BIKE" | "VAN" | string;
  veh_number: string;
  region: string;
  assign: "Assigned" | "Free" | string;
  captain: string;
  captain_type: "Third Party" | string;
  status: "Active" | "Inactive" | "Banned" | string;
  current_km: string;
  partner: string;
}

// Pagination link
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

// Pagination info
export interface Pagination {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

// Vehicle counts
export interface VehicleCounts {
  all_vehicle: number;
  no_of_vehicle_assigned: number;
  no_of_vehicle_free: number;
}

// API data wrapper
export interface VehicleResponseData {
  vehicle: Vehicle[];
  counts: VehicleCounts;
  pagination: Pagination;
}

// Full API response
export interface VehicleApiResponse {
  status: "success" | "error";
  message: string;
  data: VehicleResponseData;
}

export interface VehicleStatusChangeResponse {
  status: "success" | "error";
  message: string;
  data: VehicleDetails;
}

export interface VehicleDetails {
  id: number;
  code: string;
  brand: string;
  name: string;
  number: string;
  status: string;
  zone_id: number | null;
  type: number | string;
  region_id: string | null;
  owner_name: string;
  owner_email: string;
  owner_number: string;
  assigned_to: number | null;
  rc_book_expiry_date: string | null;
  insurance_expiry_date: string | null;
  rc_file_path: string | null;
  insurance_file_path: string | null;
  vehicle_images_paths: string | null;
  current_km: string;
  created_by: number;
  updated_by: number | null;
  created_at: string;
  updated_at: string | null;
  model_year: string | null;
}

export interface VehicleDetailsResponse {
  status: "success" | "error";
  message: string;
  data: VehicleDetails;
}

export interface Captain {
  id: number;
  name: string;
}

export interface Area {
  id: number;
  name: string;
  quadrant_name: string;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

export interface AssignCaptainPayload {
  captain_id: string;
  vehicle_id: string | number;
}

export interface AssignCaptainResponse {
  status: "success" | "error";
  message: string;
  data: string;
}

import { z } from "zod";

export const VehicleFormSchema = z.object({
  code: z.string().min(1, "Vehicle ID is required"),
  brand: z.string().min(1, "Vehicle Brand is required"),
  name: z.string().min(1, "Vehicle Name is required"),
  number: z.string().min(1, "Vehicle Number is required"),
  status: z.string().min(1, "Status is required"),
  onboarding: z.string().min(1, "Onboarding status is required"),
  region_id: z.string().min(1, "Select running Area is required"),
  type: z.string().min(1, "Vehicle Type is required"),
  owner_name: z.string().min(1, "Owner Name is required"),
  owner_email: z.string().email("Invalid email address"),
  owner_number: z.string().min(1, "Owner Number is required"),
  assigned_to: z.string().optional(),
  rc_book_expiry_date: z.string().min(1, "RC Expiry is required"),
  insurance_expiry_date: z.string().min(1, "Insurance Expiry is required"),
  current_km: z.string().min(1, "Current KM is required"),
  rc_file: z.any().optional(),
  insurance_file: z.any().optional(),
  vehicle_images: z.any().optional(),
});

export type VehicleFormValues = z.infer<typeof VehicleFormSchema>;

export interface Owner {
  id: number;
  name: string;
}
export interface VehicleType {
  id: number;
  name: string;
}

export interface GetVehicleParams {
  page?: number;
  per_page?: number;
  search?: string;
  vehicle_no?: string;
  captain?: string;
  status?: string;
  vehicle_type?: string;
  region?: string;
  owner?: string;
}

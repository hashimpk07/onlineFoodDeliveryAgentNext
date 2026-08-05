export type BaseSelect = {
  id: number;
  name: string;
};

export type Vehicle = {
  id: number;
  number: string;
};

export interface Asset {
  id: number;
  asset_name: string;
  category_id: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Region {
  id: number;
  name: string;
  pivot: {
    captain_id: number;
    region_id: number;
  };
}

export interface AutoAssignPriority {
  id: number;
  name: string;
}

export interface Document {
  id: number;
  captain_id: number;
  iqama_number?: string;
  iqama_expiry_date?: string;
  licence_number?: string;
  licence_expiry_date?: string;
  iqama_file_path: string | null;
  license_file_path: string | null;
  rc_file_path: string | null;
  insurance_file_path: string | null;
  profile_pic: string | null;
  agreement: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmploymentType {
  id: number;
  name: string;
}

export interface Nationality {
  id: number;
  name: string;
}

export interface VehicleUpdate {
  id: number;
  number: string;
  type: string;
  name?: string;
}

export interface Asset {
  id: number;
  category: string;
  name: string;
  reference_number: string;
}

export interface Status {
  value: string;
  label: string;
}

export interface Financials {
  daily_rent: number;
  monthly_salary: number;
  commission_per_order: number;
  given_custody_amount: number;
}

export interface Dates {
  joined_at: string;
  request_converted_at: string | null;
  updated_at: string | null;
}

export interface Meta {
  auto_assign_priority: string;
  created_by: string | null;
  updated_by: string | null;
  converted_by: string | null;
  current_app_version: string | null;
  device: string | null;
}

export type Account = Record<string, unknown>;

export interface Files {
  iqama_file_path: string;
  license_file_path: string;
  agreement: string | null;
  vehicle_images: string[] | null;
}

// Main Captain Details Interface
export interface CaptainDetails {
  id: number;
  code: string;
  firstname: string;
  email: string;
  phone_number: string;
  status: Status;
  nationality: Nationality | string; // Can be object or string ID
  employment_type: EmploymentType | string; // Can be object or string ID
  regions: Region[] | string; // Can be array or string ID
  auto_assign_priority: AutoAssignPriority | string; // Can be object or string ID
  vehicle: VehicleUpdate | null;
  document: Document;
  financials: Financials;
  dates: Dates;
  meta: Meta;
  asset: Asset[] | null;
  user?: User; // Optional user relation
  files: Files;
  given_custodyamount: string | null;
  vehicle_id: string | null;
}

export interface Agreement {
  agreement: string;
}

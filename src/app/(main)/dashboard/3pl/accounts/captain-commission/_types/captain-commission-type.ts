export interface CaptainCommissionResponse {
  status: "success" | "error";
  message: string;
  data: CaptainCommissionData;
}

export interface CaptainCommissionData {
  capatian_commission: CaptainCommission[];
  counts: CommissionCounts;
  pagination: Pagination;
}

export interface CaptainCommission {
  id: number;
  emp_id: string;
  captain_name: string;
  job_type: string;
  iqama_number: string;
  nationality: string;
  work_region: string;
  work_area: string;
  on_duty_from: string;
  work_status: "Active" | "Inactive";
  attended_orders: number;
  commission_order: string;
  total_commission: string;
  paid_commission: string;
  payable_commission: string;
  payment_status: "Tally" | "Payable";
}

export interface CommissionCounts {
  total_attended_orders: number;
  total_commission: string;
  average_commission: string;
  total_paid_commission: string;
  total_payable: string;
}

export interface Pagination {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  path: string;
  links: PaginationLink[];
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface GetCaptainCommissionParams {
  employee_id?: string;
  captain?: string;
  name?: string;
  iqama?: string;
  region?: string;
  area?: string;
  nationality?: string;
  onDutyFrom?: string;
  workStatus?: string;
  paymentStatus?: string;
  page?: number;
  pageSize?: number;
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

export interface Country {
  id: number;
  name: string;
}

export interface FilterCaptain {
  id: number;
  firstname: string;
}

export interface VehicleType {
  id: number;
  name: string;
}

export interface Area {
  id: number;
  name: string;
  quadrant_name: string;
}

export interface Regions {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface CaptainCommissionPaymentResponse {
  status: string;
  message: string;
  data: {
    captain_commission_payment: CaptainCommissionPayment[];
    pagination: Pagination;
  };
}

export interface CaptainCommissionPayment {
  paid_date: string;
  paid_by: string;
  paid_to: string;
  date_from_to: string;
  order_count: number;
  work_region: string;
  invoice_number: number;
  amount_paid: number;
  payment_type: string;
  document_url: string;
}

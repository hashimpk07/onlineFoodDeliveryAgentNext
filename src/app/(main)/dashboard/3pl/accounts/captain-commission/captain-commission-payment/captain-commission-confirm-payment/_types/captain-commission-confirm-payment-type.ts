export interface CaptainCommissionPayment {
  id: number;
  captain_id: number;
  emp_id?: string;
  captain_code: string;
  captain_name: string;
  working_region: string;
  work_region?: string;
  vehicle_type?: string | null;
  status: string;
  work_status?: string;
  attended_orders: number;
  extra_km_earnings: number;
  avg_commission: number;
  total_commission: number;
  total_earnings: number;
  paying_amount: number;
  paying_salary: number;
  payment_method: string;
}

export interface CaptainCommissionCount {
  attended_orders: number;
  total_avg_commission: string;
  total_commission: string;
  captains_count: number;
  total_payable_commission: string;
}

export interface CaptainCommissionPaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  counts?: CaptainCommissionCount | null;
  selectedRows: CaptainCommissionPayment[];
  fromDate?: string;
  toDate?: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Pagination {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface CaptainCommissionConfirmPaymentResponse {
  status: "success" | "error";
  message: string;
  data: {
    captain_commission_payment: CaptainCommissionPayment[];
    pagination: Pagination;
    count: CaptainCommissionCount;
  };
}

export interface GetCaptainCommissionConfirmPaymentParams {
  page?: number;
  per_page?: number;
  from_date?: string;
  to_date?: string;
  payment_status?: string;
  q?: string;
  captain?: string;
  vehicle_type?: string;
  status?: string;
  removed_zero_captain?: number;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

export interface Captain {
  id: number;
  name: string;
}

// Bulk Payment Types
export interface CaptainPaymentData {
  id: number | string;
  paying_amount: number;
  payment_mode: number; // 1 for Bank, 2 for Cash
  orders_count: number;
  avg_comm_order: number;
  paying_salary?: number | null;
  worked_days?: number | null;
  per_day_salary?: number | null;
}

export interface BulkCaptainCommissionPaymentRequest {
  captainPaymentsData: CaptainPaymentData[];
  from_date?: string;
  to_date?: string;
}

export interface BulkCaptainCommissionPaymentResponse {
  status: "success" | "error";
  message: string;
  data?: any;
}

export interface VehicleType {
  id: number;
  name: string;
}

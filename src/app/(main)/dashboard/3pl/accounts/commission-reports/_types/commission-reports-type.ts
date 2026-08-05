export interface CommissionReportResponse {
  status: "success" | "error";
  message: string;
  data: CommissionReportData;
}

export interface CommissionReportData {
  data: CommissionReport[];
  counts?: CommissionReportCounts;
  pagination: Pagination;
}

export interface CommissionReport {
  sn: number;
  company_name: string;
  cr_number: string | null;
  status: string;
  regions: string;
  attended_orders: number;
  total_earnings: string;
  paid_amount: string;
  payable_amount: string;
  payment_status: string;
}

export interface CommissionReportCounts {
  attended_orders: number;
  total_avg_commission: string;
  total_commission: string;
  total_payed_amount: string;
  total_payable_commission: string;
}

export interface CommissionReportStatisticsResponse {
  status: "success" | "error";
  message: string;
  data: {
    data: CommissionReportCounts;
  };
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

export interface GetCommissionReportParams {
  company_id?: string;
  cr_number?: string;
  region?: string;
  payment_status?: string;
  page?: number;
  pageSize?: number;
}

export interface ReconciliationPagination {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ReconciliationApiResponse {
  status: string;
  message: string;
  data: {
    captain_commission_payment: Reconciliation[];
    pagination: ReconciliationPagination;
  };
}

export interface Reconciliation {
  id: number;
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

export interface GetReconciliationParams {
  from_date?: string;
  to_date?: string;
  captain?: string;
  paid_by?: string;
  invoice_number?: string;
  payment_type?: string;
  region?: string;
  page?: number;
  per_page?: number;
}

export interface PaymentType {
  id: number;
  name: string;
}

export interface PaidBy {
  id: number;
  name: string;
}

export interface Captain {
  id: number;
  name: string;
}

export interface Regions {
  id: number;
  name: string;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

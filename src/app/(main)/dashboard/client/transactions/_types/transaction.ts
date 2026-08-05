// Pagination
export interface Pagination {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  path: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

// User
export interface TransactionUser {
  id: number | null;
  name: string | null;
}

// Actions
export interface TransactionAction {
  type: "accept" | "decline" | "re_payment" | "cancel";
  value: "Received" | "Declined" | "Pending" | "Canceled";
  icon: string;
}

// Transaction
export interface ClientTransaction {
  id: number;
  date: string;
  status_owner: "Paid Out" | "4U Paid In";
  payable: number | null;
  receivable: number | null;
  transferred: number | null;
  balance: number | null;
  payment_method: string | null;
  payment_status: string;
  payment_status_class: string;
  user: TransactionUser | null;
  attachment: string | null;
  actions: TransactionAction[];
}

// API DATA
export interface TransactionApiResponse {
  transactions: ClientTransaction[];
  pagination: Pagination;
}

// COMMON API WRAPPER
export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

export type TransactionReportFilters = {
  q?: string;
  page?: number;
  per_page?: number;
};

export interface TransactionApiResponse {
  transactions: ClientTransaction[];
  pagination: Pagination;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

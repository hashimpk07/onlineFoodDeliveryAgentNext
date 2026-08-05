export interface ClientTransaction {
  id: number;
  date: string; // "Y-m-d H:i:s"
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

export interface TransactionUser {
  id: number | null;
  name: string | null;
}

export interface TransactionAction {
  type: "accept" | "decline" | "re_payment" | "cancel";
  value: "Received" | "Declined" | "Pending" | "Canceled";
  icon: string;
}

export interface TransactionsResponse {
  status: "success" | "error";
  message: string;
  data: TransactionsData;
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

export interface TransactionsData {
  transactions: ClientTransaction[];
  pagination: Pagination;
}

export type TransactionFilters = {
  q?: string;
  page: number;
  per_page: number;
};

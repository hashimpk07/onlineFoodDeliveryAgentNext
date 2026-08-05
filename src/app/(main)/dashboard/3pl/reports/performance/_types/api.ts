import { Pagination } from "@/types/api";

export interface CaptainTransaction {
  id: number;
  captain_name: string;
  iqama_number: string;
  employee_id: string;
  employment_type: string;
  regions: string;
  working_days: number;
  productive_days: string;
  online_hours: string; // HH:MM:SS
  avg_online_hours: string; // HH:MM:SS
  total_orders_received: number;
  orders_try_to_accept: number;
  total_orders_rejected: number;
  no_response_requests: number;
  total_orders_accepted: number;
  total_orders_delivered: number;
  total_orders_returned: number;
  total_orders_cancelled: number;
  acceptance_rate: number;
  success_rate: number;
}

export interface CaptainTransactionResponse {
  captain_transaction: CaptainTransaction[];
  pagination: Pagination;
}

import type { Pagination } from "../../_types/captain-commission-type";

export interface CaptainCommissionDetailsResponse {
  status: "success" | "error";
  message: string;
  data: CaptainCommissionDetailsData;
}

export interface CaptainCommissionDetailsData {
  capatian_commission: CaptainCommissionDetails[];
  pagination: Pagination;
}

export interface CaptainCommissionDetails {
  id?: number | string;
  order_date: string;
  captain: string;
  client: string;
  shop: string;
  awb: string;
  order_status: string;
  km: string;
  bde_earning: number;
  extra_km_earning: number;
  total_earning: number;
  paid_commission: number;
  paid_datetime: string | null;
  paid_by: string | null;
  payment_status: string;
  balance: number;
  commission_payments?: {
    id: number;
    settled_at: string;
  }[];
  attachments?: {
    path: string;
  }[];
}

export interface CaptainCommissionDetailsCountResponse {
  status: "success" | "error";
  message: string;
  data: CaptainCommissionDetailsCounts;
}

export interface CaptainCommissionDetailsCounts {
  attended_orders: number;
  total_avg_commission: string;
  total_commission: string;
  total_payed_amount: string;
  total_payable_commission: string;
  payment_status?: string;
}

export interface CaptainCommissionPaymentApiResponse {
  status: "success" | "error";
  message: string;
  data: {
    id: number;
    captain_id: number;
    balance: number;
    settled_amount: number;
    settled_at: string;
    reference_no: string;
  };
}

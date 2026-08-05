import { Pagination } from "@/types/api";

export interface CaptainDetails {
  id: number;
  code: string;

  status: {
    value: string;
    label: string;
  };

  name: string;
  email: string;
  phone_number: string;

  nationality: string;
  employment_type: string;

  vehicle: {
    number: string;
    type: string;
  } | null;

  financials: {
    daily_rent: number;
    monthly_salary: number;
    commission_per_order: number;
    given_custody_amount: number;
  };

  documents: {
    iqama_number: string;
    iqama_expiry_date: string; // dd-mm-yyyy
    licence_number: string;
    licence_expiry_date: string; // dd-mm-yyyy
  };

  dates: {
    joined_at: string; // dd-mm-yyyy
    request_converted_at: string | null;
    updated_at: string | null;
  };

  regions: string;

  meta: {
    auto_assign_priority: string;
    created_by: string | null;
    updated_by: string | null;
    converted_by: string | null;
    current_app_version: string | null;
    device: string | null;
  };

  files: {
    iqama_file_path: string | null;
    license_file_path: string | null;
    agreement: string | null;
  };

  asset:
    | {
        category: string;
        name: string;
        reference_number: string;
      }[]
    | null;

  vehicle_images?: string[] | null;
}

export interface CaptainDetailsStats {
  attended_orders: number;
  delivered_orders: number;
  success_rate: number;
  order_returns: number;
  rent_due: number;
  receivable_amount: number;
  payable_amount: number;
}
export interface ShiftLog {
  id: number;
  vehicle: {
    type: string | null;
    number: string | null;
  };
  date: string | null; // YYYY-MM-DD
  start_time: string | null; // hh:mm AM/PM
  end_time: string | "Active";
  duration: string | null;

  start_kilometer: number | null;
  end_kilometer: number | null;
}

export interface OrderLog {
  id: number;
  delivery_date: string;
  client_name: string | null;
  shop_name: string | null;
  status: {
    id: number | null;
    name: string | null;
    badge_class: string | null;
  };

  amount: {
    value: number;
    currency: "SAR";
    formatted: string;
  };

  payment: {
    delivery_mode: string;
    mode: string;
    can_edit: boolean;
  };
  order_number: string;
}

export type CaptainOrderHistoryResponse = {
  orders: OrderLog[];
  pagination: Pagination;
};

export type CaptainShiftHistoryResponse = {
  shifts: ShiftLog[];
  pagination: Pagination;
};

interface Payment {
  id: number;
  order_id: number;
  payment_mode: string;
}

export interface OrderPayment {
  id: number;
  amount: string;
  reassign_disable: boolean;
  payment: Payment;
  captain: any;
  shop: any;
}

export type UpdatePaymentData = {
  amount: string;
  order_amount: string;
  payment_method: "By Cash" | "By POS" | "Both";
  cash?: string;
  bank?: string;
};

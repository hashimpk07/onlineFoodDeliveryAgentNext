export interface CompanyEarningOrder {
  id: number;
  order_date: string;
  order_number: string;
  client_name: string;
  shop_name: string;
  awb: string;
  distance_shop_delivery: string;
  extra_km: number;
  delivered_date: string;
  order_status: string | null;
  captain: string;
  iqama_no: string | null;
  bd_earning: number;
  ekm_earning: number;
  total_earning: number;
  sub_total: number;
  payments: Record<string, any> | null;
}

export interface CompanyEarningPagination {
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

export interface CompanyEarningCount {
  attended_orders: number;
  avg_commission: string;
  total_commission: string;
  total_payed_commission: string;
  payable_commission: string;
}

export interface CompanyEarningApiResponse {
  status: string;
  message: string;
  data: {
    data: CompanyEarningOrder[];
    pagination: CompanyEarningPagination;
    count: CompanyEarningCount;
  };
}

export interface GetCompanyEarningParams {
  from_date?: string;
  to_date?: string;
  client?: string;
  shop?: string;
  q?: string;
  status?: string;
  page?: number;
  per_page?: number;
}

export interface Client {
  id: number;
  name: string;
}

export interface Shop {
  id: number;
  name: string;
  client_id: number;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

/* eslint-disable */
export interface TicketRecord {
  id: string | number;
  zone: any;
  area: any;
  region: any;
  client: string;
  branch: string;
  order_ref: string;
  client_order_id: string;
  captain: any;
  attended_by: any;
  ticket: any;
  open_time: string;
  close_time: string;
  closing_period: string;
  status_date: string;
  time: string;
  ticket_type: any;
  [key: string]: unknown;
}

export interface TicketListResponse {
  status: string;
  message: string;
  data: {
    tickets: TicketRecord[];
    pagination?: {
      total: number;
      last_page: number;
      current_page: number;
    };
  };
}

export interface TicketListParams {
  page?: number;
  per_page?: number;
  from_date?: string;
  to_date?: string;
}

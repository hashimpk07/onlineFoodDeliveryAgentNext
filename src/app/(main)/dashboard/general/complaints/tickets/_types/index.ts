export interface TicketStatus {
  name: string;
  class: string;
}

export interface TicketCaptain {
  name: string;
  phone_number: string;
}

export interface TicketMessage {
  id: string | number;
  sender: string;
  message: string;
  created_at: string;
  is_own?: boolean;
}

// ── Display shape consumed by the UI panels ──────────────────────────────────

export interface TicketOrder {
  id: number;
  order_db_id: number | null;
  order_id: string;
  client_order_id: string;
  client_name: string | null;
  shop_name: string;
  area?: string;
  zone?: string;
  amount?: string;
  delivery_type: string;
  payment_mode?: string;
  opened_at?: string;
  taken_at?: string | null;
  taken_by: number | null;
  engaged_by_name: string | null;
  not_seen_messages_count: number;
  closed_at?: string | null;
  created_at?: string;
  updated_at: string;
  type: number;
  captain_id: number | null;
  status: TicketStatus | null;
  captain: TicketCaptain | null;
  issue_title?: string;
  customer_name?: string;
  customer_number?: string;
  customer_email?: string;
  customer_address?: string;
  messages?: TicketMessage[];
}

// ── Raw shapes returned by GET /public/tickets ───────────────────────────────

export interface RawTicketCaptain {
  id: number;
  firstname: string;
  lastname: string | null;
  phone_number?: string | null;
}

export interface RawTicketOrderShop {
  id?: number;
  name?: string;
  region?: string;
  zone?: string;
}

export interface RawTicketOrder {
  id: number;
  code: string;
  client_order_id: string | null;
  delivery_type?: string | null;
  payment_mode?: string | null;
  shop?: RawTicketOrderShop | null;
  captain?: RawTicketCaptain | null;
}

export interface RawTicketClientUser {
  id: number;
  name: string | null;
  email?: string | null;
}

export interface RawTicketClient {
  id: number;
  owner_name?: string | null;
  contact_name?: string | null;
  email?: string | null;
  contact_email?: string | null;
  mobile_number?: string | null;
  contact_mobile_no?: string | null;
  address?: string | null;
  user?: RawTicketClientUser | null;
}

export interface RawTicketTakenByUser {
  id: number;
  name: string | null;
  email?: string | null;
}

export interface RawTicket {
  id: number;
  subject: string | null;
  order_id: number;
  captain_id: number | null;
  opened_at: string | null;
  taken_at: string | null;
  taken_by: number | null;
  taken_by_user?: RawTicketTakenByUser | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  type: number;
  not_seen_messages_count?: number;
  time?: string;
  captain: RawTicketCaptain | null;
  order: RawTicketOrder | null;
  client: RawTicketClient | null;
}

export interface TicketsMessageCounts {
  ticket: number;
  pending: number;
  client: number;
}

export interface TicketsListData {
  tickets: RawTicket[];
  messageCounts: TicketsMessageCounts;
}

export interface TicketsListResponse {
  status: string;
  message: string;
  data: TicketsListData;
}

// ── Raw shapes returned by GET /public/ticket/{id} ───────────────────────────

export interface RawTicketDetailsShop {
  id?: number;
  name?: string | null;
  address?: string | null;
  location?: string | null;
}

export interface RawTicketDetailsProgress {
  id?: number;
  name?: string | null;
  status_class?: string | null;
}

export interface RawTicketDetailsCaptain {
  id: number;
  firstname?: string | null;
  lastname?: string | null;
  phone_number?: string | null;
}

export interface RawTicketDetailsClientUser {
  id: number;
  name?: string | null;
  email?: string | null;
}

export interface RawTicketDetailsClient {
  id: number;
  owner_name?: string | null;
  owner_email?: string | null;
  contact_name?: string | null;
  contact_email?: string | null;
  email?: string | null;
  mobile_number?: string | null;
  contact_mobile_no?: string | null;
  address?: string | null;
  payment_mode?: string | null;
  delivery_type?: string | null;
  user?: RawTicketDetailsClientUser | null;
}

export interface RawTicketDetailsOrder {
  id: number;
  code: string;
  client_order_id?: string | null;
  created_at?: string | null;
  delivery_type?: string | null;
  captain?: RawTicketDetailsCaptain | null;
  client?: RawTicketDetailsClient | null;
  progress?: RawTicketDetailsProgress | null;
  shop?: RawTicketDetailsShop | null;
}

export interface RawTicketMessageSender {
  id: number;
  name?: string | null;
}

export interface RawTicketMessage {
  id: number;
  ticket_id: number;
  sender_id: number;
  message: string;
  created_at: string;
  sender?: RawTicketMessageSender | null;
}

export interface RawTicketDetails {
  id: number;
  subject: string | null;
  order_id: number;
  captain_id: number | null;
  opened_at: string | null;
  taken_at: string | null;
  taken_by: number | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  type: number;
  time?: string | null;
  client?: RawTicketDetailsClient | null;
  messages?: RawTicketMessage[];
  order?: RawTicketDetailsOrder | null;
  captain?: RawTicketDetailsCaptain | null;
}

export interface TicketDetailsResponse {
  status: string;
  message: string;
  data: RawTicketDetails;
}

// ── Display shape for the shipping/billing/delivery info panel ──────────────

export interface TicketDetails {
  id: number;
  order_db_id: number | null;
  order_id: string;
  client_name: string | null;
  client_shop: string | null;
  client_order_id: string | null;
  created_date: string | null;
  delivery_type: string | null;
  customer_name: string | null;
  customer_number: string | null;
  customer_email: string | null;
  address: string | null;
  payment_mode: string | null;
  status: string | null;
  captain_name: string | null;
  captain_mobile: string | null;
  messages: TicketMessage[];
}

// ── Raw shape returned by GET /public/complaint/{orderID}/messages ──────────

export interface RawComplaintMessage {
  id: number;
  message: string;
  ticket_id: number;
  sender_id: number;
  sender_email?: string | null;
  sender_type?: string | null;
  sender_name?: string | null;
  send_at: string;
  is_own: boolean;
  created_at: string;
  updated_at: string;
}

export interface ComplaintMessagesResponse {
  status: string;
  message: string;
  data: RawComplaintMessage[];
}

export interface SendComplaintMessageResponse {
  status: string;
  message: string;
  data: RawComplaintMessage;
}

export type Message = {
  id: number;
  sender: "client" | "support";
  message: string;
  time: string;
};

export type SendMessageResponse = {
  success: boolean;
  data?: {
    id: number;
    message: string;
    order_id: string;
    created_at: string;
  };
  message?: string;
};

export type SendMessagePayload = {
  message: string;
};

export type OrderChatProps = {
  orderId: string;
  client_order_id: string;
  isOpen: boolean;
  onClose: () => void;
};

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
  errors?: Record<string, string[]>;
}

export interface TicketMessage {
  id: number;
  message: string;
  ticket_id: number;
  sender_id: number;
  sender_email: string;
  sender_type: "CLIENT_EMPLOYEE" | string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

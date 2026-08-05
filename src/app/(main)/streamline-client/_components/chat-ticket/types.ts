export interface chatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
}

export interface TicketMessage {
  id: string;
  message: string;
  ticket_id: number;
  sender_id: number;
  sender_email: string;
  sender_type: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  send_at: string; // ISO date string
  sender_name: string;
  is_own: boolean;
}

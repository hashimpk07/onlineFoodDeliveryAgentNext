import { LucideIcon } from "lucide-react";

export interface OrderLog {
  orderStatus: string;
  statusUpdatedBy: string;
  date: string;
  time: string;
  timeBWStatus: string;
  processingTime: string;
  keyTimes?: string;
  kmBW?: string;
}

export interface OrderData {
  shipping: {
    clientName: string;
    shop: string;
    clientOrderId: string;
    createdDate: string;
    deliveryType: string;
  };
  billing: {
    customerName: string;
    customerNumber: string;
    customerEmail?: string;
    address?: string;
  };
  delivery: {
    orderId: string;
    paymentMode: string;
    status: string;
    captainName: string;
    captainMobile?: string;
  };
  logs: OrderLog[];
}

export interface OrderDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  selectedOrderId: string | null;
}

export interface OrderLogsTableProps {
  logs: OrderLogTableResponse[];
  orderId: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  title?: string;
}

export type OrderResponse = {
  shipping: Shipping;
  billing: Billing;
  delivery_info: DeliveryInfo;
  logs: OrderLogTableResponse[];
};

export interface Shipping {
  client_name: string;
  shop: string;
  client_order_id: string;
  created_at: string; // ISO date string
  delivery_type: string;
}

export interface Billing {
  customer_name: string | null;
  customer_number: string;
  email: string | null;
  address: string;
}

export interface DeliveryInfo {
  order_id: number;
  payment_mode: string;
  status: string;
  captain: string;
  captain_phone: string;
}

export interface OrderLogTableResponse {
  status: string;
  canceled_by: string | null;
  repeated_count: number | null;
  note: string | null;
  created_by: string | null;
  date: string;
  time: string;
  timeBWStatus: string;
  processingTime: string;
  keyTimes: string | null;
  kmBW: string | null;
}

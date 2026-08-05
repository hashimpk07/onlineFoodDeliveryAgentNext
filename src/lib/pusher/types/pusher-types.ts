export interface Order {
  id: number;
  client_order_id?: string;
  awb?: string;
  client: string;
  shop: string;
  status_id: number;
}

export interface Ticket {
  id: number;
  type: number; // 1: ticket, 2: pending, 3: client
  order: {
    id: number;
  };
  not_seen_messages_count?: number;
}

export interface NewOrderEvent {
  order: Order;
}

export interface OrderStatusChangedEvent {
  order: Order;
}

export interface ClientDeclinedReturnEvent {
  order: Order;
}

export interface NewTicketEvent {
  ticket: Ticket;
}

export interface TicketUpdatedEvent {
  ticket: Ticket;
}

export interface TicketClosedEvent {
  ticket: Ticket;
}

export interface OrderAcceptingTimeOutedEvent {
  order: Order;
}

export interface OrderRejectedEvent {
  order: Order;
}

export type PusherEventHandler<T> = (event: T) => void;

export const PUSHER_CONFIG = {
  key: process.env.NEXT_PUBLIC_PUSHER_KEY ?? "",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "mt1",
  forceTLS: process.env.NEXT_PUBLIC_PUSHER_FORCE_TLS === "true",
} as const;

export const PUSHER_CHANNELS = {
  ORDERS: "orders",
  TICKET: "ticket",
  CLIENT_ORDERS: "client_orders",
} as const;

export const PUSHER_EVENTS = {
  // Order events
  NEW_ORDER: "NewOrder",
  ORDER_STATUS_CHANGED: "OrderStatusChanged",
  CLIENT_DECLINED_RETURN: "ClientDeclinedReturn",

  // Ticket events
  NEW_TICKET: "NewTicket",
  TICKET_UPDATED: "TicketUpdated",
  TICKET_CLOSED: "TicketClosed",

  // User-specific events
  ORDER_ACCEPTING_TIME_OUTED: "OrderAcceptingTimeOuted",
  ORDER_REJECTED: "OrderRejected",
} as const;

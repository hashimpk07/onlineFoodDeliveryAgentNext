// OrderStatus.enum.ts (or any .ts file)
/* eslint-disable */
export enum OrderStatus {
  NEW_ORDER = 1,
  NOT_ASSIGNED = 2,
  ACCEPT = 3,
  START_RIDE = 4,
  REACHED_SHOP = 5,
  PICKED = 6,
  PICKED_UP = 7,
  SHIPPED = 8,
  REACHED_DESTINATION = 9,
  DELIVERED = 10,
  REQUEST_FOR_CANCEL = 11,
  CANCEL_REQUEST_ACCEPTED = 12,
  RETURN_TO_FORYOU = 13,
  FORYOU_RETURN_ACCEPTED = 14,
  RETURN_TO_CLIENT = 15,
  CLIENT_RETURN_ACCEPTED = 16,
  INCOMPLETE = 17,
  PENDING = 18,
  CANCEL = 19,
  REFUSE = 20,
  TICKET_RAISED = 21,
  REROUTED = 22,
  ASSIGN_ATTEMPTS = 23,
  ORDER_PACKAGE = 24,
  CLIENT_RETURN_DECLINE = 25,
  RELOCATED = 26,
  WAITING_FOR_ACCEPTING = 27,
  WAITING_TIME_OUT = 28,
  CAPTAIN_ORDER_REJECTED = 29,
  ASSIGNED_BY = 30,
  ASSIGNED_TO = 31,
  REASSIGNED_BY = 32,
  REASSIGNED_TO = 33,
  RESCHEDULED = 35,
  CALL_FOR_CONFIRMATION = 37,
  CUSTOMER_CONFIRMED = 38,
}

/* ---------------- STATUS GROUPS ---------------- */

export const LOGISTICS_STATUSES: OrderStatus[] = [
  OrderStatus.ACCEPT,
  OrderStatus.START_RIDE,
  OrderStatus.REACHED_SHOP,
  OrderStatus.PICKED,
  OrderStatus.SHIPPED,
  OrderStatus.REACHED_DESTINATION,
  OrderStatus.DELIVERED,
  OrderStatus.REQUEST_FOR_CANCEL,
  OrderStatus.CANCEL_REQUEST_ACCEPTED,
  OrderStatus.RETURN_TO_FORYOU,
  OrderStatus.RETURN_TO_CLIENT,
  OrderStatus.CLIENT_RETURN_ACCEPTED,
  OrderStatus.PENDING,
  OrderStatus.CANCEL,
  OrderStatus.TICKET_RAISED,
  OrderStatus.REROUTED,
];

export const OPEN_STATUSES: OrderStatus[] = [
  OrderStatus.NEW_ORDER,
  OrderStatus.ORDER_PACKAGE,
  OrderStatus.ASSIGN_ATTEMPTS,
  OrderStatus.NOT_ASSIGNED,
  OrderStatus.ACCEPT,
  OrderStatus.START_RIDE,
  OrderStatus.REACHED_SHOP,
  OrderStatus.PICKED,
  OrderStatus.PICKED_UP,
  OrderStatus.SHIPPED,
  OrderStatus.REACHED_DESTINATION,
  OrderStatus.REROUTED,
  OrderStatus.TICKET_RAISED,
];

export const NOT_ASSIGNED_ORDER: OrderStatus[] = [
  OrderStatus.NEW_ORDER,
  OrderStatus.NOT_ASSIGNED,
  OrderStatus.ORDER_PACKAGE,
  OrderStatus.ASSIGN_ATTEMPTS,
];

export const ON_GOING_ORDER: OrderStatus[] = [
  OrderStatus.ACCEPT,
  OrderStatus.START_RIDE,
  OrderStatus.REACHED_SHOP,
  OrderStatus.PICKED,
  OrderStatus.PICKED_UP,
  OrderStatus.SHIPPED,
  OrderStatus.REACHED_DESTINATION,
  OrderStatus.REROUTED,
];

export const IN_CAPTAIN_DELIVERING: OrderStatus[] = [
  OrderStatus.PICKED,
  OrderStatus.SHIPPED,
  OrderStatus.REACHED_DESTINATION,
  OrderStatus.REROUTED,
  OrderStatus.TICKET_RAISED,
  OrderStatus.PENDING,
  OrderStatus.RELOCATED,
];

export const FINISHED: OrderStatus[] = [
  OrderStatus.DELIVERED,
  OrderStatus.CANCEL,
  OrderStatus.CLIENT_RETURN_DECLINE,
  OrderStatus.FORYOU_RETURN_ACCEPTED,
  OrderStatus.CLIENT_RETURN_ACCEPTED,
  OrderStatus.CANCEL_REQUEST_ACCEPTED,
];

export const UNABLE_TO_CHANGE_NEW_ORDER: OrderStatus[] = [
  OrderStatus.DELIVERED,
  OrderStatus.CANCEL,
  OrderStatus.CLIENT_RETURN_DECLINE,
  OrderStatus.FORYOU_RETURN_ACCEPTED,
  OrderStatus.CLIENT_RETURN_ACCEPTED,
  OrderStatus.CANCEL_REQUEST_ACCEPTED,
  OrderStatus.REQUEST_FOR_CANCEL,
];

export const NEED_LOCATION_STATUS_CAPTAINS: OrderStatus[] = [
  OrderStatus.ACCEPT,
  OrderStatus.START_RIDE,
  OrderStatus.REACHED_SHOP,
  OrderStatus.RETURN_TO_CLIENT,
];

/* ---------------- STATUS COLORS ----------------
 * Exact hex values from App\OrderStatus::getBadgeClass() and the matching
 * CSS in public/css/custom.css, so a given status_id renders with the
 * *same* color here as it does in the 4u backend (list badges, order
 * detail header, progress tracker, etc). Keep these two files in sync.
 *
 * NOTE: classes are written out fully (not built from a template string)
 * because Tailwind's build scans this file's literal text for class names —
 * a dynamically interpolated `bg-[${hex}]` would never be generated.
 */

export type OrderStatusColor = {
  badge: string;
  dot: string;
  ring: string;
};

const DEFAULT_STATUS_COLOR: OrderStatusColor = {
  badge: "bg-muted text-muted-foreground border-muted",
  dot: "bg-muted-foreground border-muted-foreground",
  ring: "ring-muted-foreground/15",
};

export const ORDER_STATUS_COLORS: Record<number, OrderStatusColor> = {
  [OrderStatus.NEW_ORDER]: {
    // badge-warning
    badge: "border-transparent text-[#212529] bg-[#ffc107]",
    dot: "bg-[#ffc107] border-[#ffc107]",
    ring: "ring-[#ffc107]/20",
  },
  [OrderStatus.NOT_ASSIGNED]: {
    // badge-danger
    badge: "border-transparent text-white bg-[#dc3545]",
    dot: "bg-[#dc3545] border-[#dc3545]",
    ring: "ring-[#dc3545]/20",
  },
  [OrderStatus.ACCEPT]: {
    // badge-primary
    badge: "border-transparent text-white bg-[#007bff]",
    dot: "bg-[#007bff] border-[#007bff]",
    ring: "ring-[#007bff]/20",
  },
  [OrderStatus.START_RIDE]: {
    // badge-secondary
    badge: "border-transparent text-white bg-[#6c757d]",
    dot: "bg-[#6c757d] border-[#6c757d]",
    ring: "ring-[#6c757d]/20",
  },
  [OrderStatus.REACHED_SHOP]: {
    // badge-info
    badge: "border-transparent text-white bg-[#17a2b8]",
    dot: "bg-[#17a2b8] border-[#17a2b8]",
    ring: "ring-[#17a2b8]/20",
  },
  [OrderStatus.PICKED]: {
    // badge-order-picked
    badge: "border-transparent text-white bg-[#be185d]",
    dot: "bg-[#be185d] border-[#be185d]",
    ring: "ring-[#be185d]/20",
  },
  [OrderStatus.PICKED_UP]: {
    // badge-picked-up
    badge: "border-transparent text-white bg-[#7c3aed]",
    dot: "bg-[#7c3aed] border-[#7c3aed]",
    ring: "ring-[#7c3aed]/20",
  },
  [OrderStatus.SHIPPED]: {
    // badge-dark
    badge: "border-transparent text-white bg-[#343a40]",
    dot: "bg-[#343a40] border-[#343a40]",
    ring: "ring-[#343a40]/20",
  },
  [OrderStatus.REACHED_DESTINATION]: {
    // badge-reached-destination
    badge: "border-transparent text-white bg-[#4f46e5]",
    dot: "bg-[#4f46e5] border-[#4f46e5]",
    ring: "ring-[#4f46e5]/20",
  },
  [OrderStatus.DELIVERED]: {
    // badge-success
    badge: "border-transparent text-white bg-[#28a745]",
    dot: "bg-[#28a745] border-[#28a745]",
    ring: "ring-[#28a745]/20",
  },
  [OrderStatus.REQUEST_FOR_CANCEL]: {
    // badge-foryou-request-for-cancel
    badge: "border-transparent text-white bg-[#ff4e4e]",
    dot: "bg-[#ff4e4e] border-[#ff4e4e]",
    ring: "ring-[#ff4e4e]/20",
  },
  [OrderStatus.CANCEL_REQUEST_ACCEPTED]: {
    // badge-cancel-request-accepted
    badge: "border-transparent text-white bg-[#e11d48]",
    dot: "bg-[#e11d48] border-[#e11d48]",
    ring: "ring-[#e11d48]/20",
  },
  [OrderStatus.RETURN_TO_FORYOU]: {
    // badge-success.orange
    badge: "border-transparent text-white bg-[#fc7000]",
    dot: "bg-[#fc7000] border-[#fc7000]",
    ring: "ring-[#fc7000]/20",
  },
  [OrderStatus.FORYOU_RETURN_ACCEPTED]: {
    // badge-return-foryou
    badge: "border-transparent text-white bg-[#5fc8aa]",
    dot: "bg-[#5fc8aa] border-[#5fc8aa]",
    ring: "ring-[#5fc8aa]/20",
  },
  [OrderStatus.RETURN_TO_CLIENT]: {
    // badge-success.gold
    badge: "border-transparent text-[#212529] bg-[#ffab00]",
    dot: "bg-[#ffab00] border-[#ffab00]",
    ring: "ring-[#ffab00]/20",
  },
  [OrderStatus.CLIENT_RETURN_ACCEPTED]: {
    // badge-return-client
    badge: "border-transparent text-white bg-[#00d61a]",
    dot: "bg-[#00d61a] border-[#00d61a]",
    ring: "ring-[#00d61a]/20",
  },
  [OrderStatus.INCOMPLETE]: {
    // badge-incomplete
    badge: "border-transparent text-white bg-[#64748b]",
    dot: "bg-[#64748b] border-[#64748b]",
    ring: "ring-[#64748b]/20",
  },
  [OrderStatus.PENDING]: {
    // badge-foryou-pending
    badge: "border-transparent text-white bg-[#ff4e4e]",
    dot: "bg-[#ff4e4e] border-[#ff4e4e]",
    ring: "ring-[#ff4e4e]/20",
  },
  [OrderStatus.CANCEL]: {
    // badge-success.brown
    badge: "border-transparent text-white bg-[#a52a2a]",
    dot: "bg-[#a52a2a] border-[#a52a2a]",
    ring: "ring-[#a52a2a]/20",
  },
  [OrderStatus.REFUSE]: {
    // badge-refuse
    badge: "border-transparent text-white bg-[#991b1b]",
    dot: "bg-[#991b1b] border-[#991b1b]",
    ring: "ring-[#991b1b]/20",
  },
  [OrderStatus.TICKET_RAISED]: {
    // badge-ticket-raised
    badge: "border-transparent text-white bg-[#a21caf]",
    dot: "bg-[#a21caf] border-[#a21caf]",
    ring: "ring-[#a21caf]/20",
  },
  [OrderStatus.REROUTED]: {
    // badge-rerouted
    badge: "border-transparent text-white bg-[#0d9488]",
    dot: "bg-[#0d9488] border-[#0d9488]",
    ring: "ring-[#0d9488]/20",
  },
  [OrderStatus.ASSIGN_ATTEMPTS]: {
    // badge-assign-attempts
    badge: "border-transparent text-white bg-[#0284c7]",
    dot: "bg-[#0284c7] border-[#0284c7]",
    ring: "ring-[#0284c7]/20",
  },
  [OrderStatus.ORDER_PACKAGE]: {
    // badge-order-package
    badge: "border-transparent text-white bg-[#6366f1]",
    dot: "bg-[#6366f1] border-[#6366f1]",
    ring: "ring-[#6366f1]/20",
  },
  [OrderStatus.CLIENT_RETURN_DECLINE]: {
    // badge-client-return-decline
    badge: "border-transparent text-white bg-[#ea580c]",
    dot: "bg-[#ea580c] border-[#ea580c]",
    ring: "ring-[#ea580c]/20",
  },
  [OrderStatus.RELOCATED]: {
    // badge-relocated
    badge: "border-transparent text-white bg-[#14b8a6]",
    dot: "bg-[#14b8a6] border-[#14b8a6]",
    ring: "ring-[#14b8a6]/20",
  },
  [OrderStatus.WAITING_FOR_ACCEPTING]: {
    // badge-waiting-for-accepting
    badge: "border-transparent text-white bg-[#d97706]",
    dot: "bg-[#d97706] border-[#d97706]",
    ring: "ring-[#d97706]/20",
  },
  [OrderStatus.WAITING_TIME_OUT]: {
    // badge-waiting-timeout
    badge: "border-transparent text-white bg-[#b91c1c]",
    dot: "bg-[#b91c1c] border-[#b91c1c]",
    ring: "ring-[#b91c1c]/20",
  },
  [OrderStatus.CAPTAIN_ORDER_REJECTED]: {
    // badge-captain-rejected
    badge: "border-transparent text-white bg-[#7f1d1d]",
    dot: "bg-[#7f1d1d] border-[#7f1d1d]",
    ring: "ring-[#7f1d1d]/20",
  },
  [OrderStatus.ASSIGNED_BY]: {
    // badge-assigned-by
    badge: "border-transparent text-white bg-[#60a5fa]",
    dot: "bg-[#60a5fa] border-[#60a5fa]",
    ring: "ring-[#60a5fa]/20",
  },
  [OrderStatus.ASSIGNED_TO]: {
    // badge-assigned-to
    badge: "border-transparent text-white bg-[#2563eb]",
    dot: "bg-[#2563eb] border-[#2563eb]",
    ring: "ring-[#2563eb]/20",
  },
  [OrderStatus.REASSIGNED_BY]: {
    // badge-reassigned-by
    badge: "border-transparent text-[#212529] bg-[#93c5fd]",
    dot: "bg-[#93c5fd] border-[#93c5fd]",
    ring: "ring-[#93c5fd]/20",
  },
  [OrderStatus.REASSIGNED_TO]: {
    // badge-reassigned-to
    badge: "border-transparent text-white bg-[#1d4ed8]",
    dot: "bg-[#1d4ed8] border-[#1d4ed8]",
    ring: "ring-[#1d4ed8]/20",
  },
  [OrderStatus.RESCHEDULED]: {
    // bg-warning text-dark
    badge: "border-transparent text-[#212529] bg-[#ffc107]",
    dot: "bg-[#ffc107] border-[#ffc107]",
    ring: "ring-[#ffc107]/20",
  },
  [OrderStatus.CALL_FOR_CONFIRMATION]: {
    // bg-warning text-dark
    badge: "border-transparent text-[#212529] bg-[#ffc107]",
    dot: "bg-[#ffc107] border-[#ffc107]",
    ring: "ring-[#ffc107]/20",
  },
  [OrderStatus.CUSTOMER_CONFIRMED]: {
    // bg-warning text-dark
    badge: "border-transparent text-[#212529] bg-[#ffc107]",
    dot: "bg-[#ffc107] border-[#ffc107]",
    ring: "ring-[#ffc107]/20",
  },
};

export function getOrderStatusColor(
  statusId?: number | null,
): OrderStatusColor {
  if (statusId == null) return DEFAULT_STATUS_COLOR;

  return ORDER_STATUS_COLORS[statusId] ?? DEFAULT_STATUS_COLOR;
}

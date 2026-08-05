import { Order } from "../_types/order-report-type";

export const data: Order[] = [];

const NA = "N/A";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parseDateTime(value: string): Date | null {
  // Normalize "YYYY-MM-DD HH:MM:SS" → "YYYY-MM-DDTHH:MM:SS" so all browsers
  // treat it as local time (not UTC). ISO strings with Z/offset are passed as-is.
  const normalized = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(value)
    ? value.replace(" ", "T")
    : value;
  const d = new Date(normalized);
  return isNaN(d.getTime()) ? null : d;
}

export function formatDate(value?: string | null) {
  if (!value) return NA;
  const d = parseDateTime(value);
  if (!d) return NA;
  return `${String(d.getDate()).padStart(2, "0")}-${MONTHS[d.getMonth()]}-${d.getFullYear()}`;
}

export function formatTime(value?: string | null) {
  if (!value) return NA;
  const d = parseDateTime(value);
  if (!d) return NA;
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function safeValue<T>(value: T | null | undefined) {
  return value ?? NA;
}

export function mapQueryToApiParams(query: Record<string, any>) {
  const formatDateParam = (d: Date | string) =>
    d instanceof Date ? d.toISOString().split("T")[0] : d.split("T")[0];

  const captain =
    query.captain != null
      ? Array.isArray(query.captain)
        ? query.captain
        : [query.captain]
      : undefined;

  return {
    captain,
    client_order_id: query.client_order_id ?? undefined,
    from_date: query.from_date ? formatDateParam(query.from_date) : undefined,
    to_date: query.to_date ? formatDateParam(query.to_date) : undefined,
    order_time_from: query.order_time_from ?? undefined,
    order_time_to: query.order_time_to ?? undefined,
    search: query.search ?? undefined,
  };
}

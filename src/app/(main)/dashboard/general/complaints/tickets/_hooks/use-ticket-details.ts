"use client";

import { useQuery } from "@tanstack/react-query";

import { getTicketDetails } from "../_api/get-ticket-details";
import {
  RawTicketDetails,
  RawTicketDetailsCaptain,
  RawTicketDetailsClient,
  RawTicketDetailsOrder,
  TicketDetails,
} from "../_types";

function formatCreatedDate(value?: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const time = date
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();

  return `${day}-${month}-${year} ${time}`;
}

function captainName(captain?: RawTicketDetailsCaptain | null): string | null {
  if (!captain) return null;
  const name = [captain.firstname, captain.lastname]
    .filter(Boolean)
    .join(" ")
    .trim();
  return name || null;
}

function resolveOrderDbId(raw: RawTicketDetails): number | null {
  return raw.order?.id ?? raw.order_id;
}

function resolveOrderCode(raw: RawTicketDetails): string {
  return raw.order?.code ?? String(raw.order_id);
}

function resolveClientName(
  client?: RawTicketDetailsClient | null,
): string | null {
  return client?.user?.name ?? client?.owner_name ?? null;
}

function resolveDeliveryType(
  order?: RawTicketDetailsOrder | null,
  client?: RawTicketDetailsClient | null,
): string | null {
  return order?.delivery_type ?? client?.delivery_type ?? null;
}

function resolveCreatedDate(
  order: RawTicketDetailsOrder | null | undefined,
  raw: RawTicketDetails,
): string | null {
  return formatCreatedDate(order?.created_at ?? raw.created_at);
}

function resolveCustomerName(
  client?: RawTicketDetailsClient | null,
): string | null {
  return client?.contact_name ?? client?.owner_name ?? null;
}

function resolveCustomerNumber(
  client?: RawTicketDetailsClient | null,
): string | null {
  return client?.contact_mobile_no ?? client?.mobile_number ?? null;
}

function resolveCustomerEmail(
  client?: RawTicketDetailsClient | null,
): string | null {
  return client?.contact_email ?? client?.email ?? null;
}

function resolveAddress(
  order?: RawTicketDetailsOrder | null,
  client?: RawTicketDetailsClient | null,
): string | null {
  return order?.shop?.address ?? client?.address ?? null;
}

function mapMessages(raw: RawTicketDetails) {
  return (raw.messages ?? []).map((message) => ({
    id: message.id,
    sender: message.sender?.name ?? "Unknown",
    message: message.message,
    created_at: message.created_at,
  }));
}

function resolveContext(raw: RawTicketDetails) {
  const order = raw.order ?? null;
  const client = order?.client ?? raw.client ?? null;
  const captain = raw.captain ?? order?.captain ?? null;
  return { order, client, captain };
}

function resolveClientShop(
  order?: RawTicketDetailsOrder | null,
): string | null {
  return order?.shop?.name ?? null;
}

function resolveClientOrderId(
  order?: RawTicketDetailsOrder | null,
): string | null {
  return order?.client_order_id ?? null;
}

function resolvePaymentMode(
  client?: RawTicketDetailsClient | null,
): string | null {
  return client?.payment_mode ?? null;
}

function resolveStatus(order?: RawTicketDetailsOrder | null): string | null {
  return order?.progress?.name ?? null;
}

function resolveCaptainMobile(
  captain?: RawTicketDetailsCaptain | null,
): string | null {
  return captain?.phone_number ?? null;
}

function mapTicketDetails(raw: RawTicketDetails): TicketDetails {
  const { order, client, captain } = resolveContext(raw);

  return {
    id: raw.id,
    order_db_id: resolveOrderDbId(raw),
    order_id: resolveOrderCode(raw),
    client_name: resolveClientName(client),
    client_shop: resolveClientShop(order),
    client_order_id: resolveClientOrderId(order),
    created_date: resolveCreatedDate(order, raw),
    delivery_type: resolveDeliveryType(order, client),
    customer_name: resolveCustomerName(client),
    customer_number: resolveCustomerNumber(client),
    customer_email: resolveCustomerEmail(client),
    address: resolveAddress(order, client),
    payment_mode: resolvePaymentMode(client),
    status: resolveStatus(order),
    captain_name: captainName(captain),
    captain_mobile: resolveCaptainMobile(captain),
    messages: mapMessages(raw),
  };
}

export function useTicketDetails(id: number | null) {
  const query = useQuery({
    queryKey: ["ticket-details", id],
    queryFn: () => getTicketDetails(id as number),
    enabled: id != null,
  });

  return {
    details: query.data ? mapTicketDetails(query.data.data) : null,
    isLoading: query.isLoading || query.isFetching,
    isError: query.isError,
    error: query.error,
  };
}

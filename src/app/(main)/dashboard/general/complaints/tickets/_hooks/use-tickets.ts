"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getTickets } from "../_api/get-tickets";
import {
  RawTicket,
  TicketCaptain,
  TicketOrder,
  TicketsMessageCounts,
} from "../_types";

function captainName(captain: RawTicket["captain"]): string | null {
  if (!captain) return null;
  return [captain.firstname, captain.lastname].filter(Boolean).join(" ").trim();
}

function resolveCaptain(raw: RawTicket): TicketCaptain | null {
  const captain = raw.captain ?? raw.order?.captain ?? null;
  if (!captain) return null;

  return {
    name: captainName(captain) ?? "-",
    phone_number: captain.phone_number ?? "",
  };
}

function resolveOrderDbId(raw: RawTicket): number | null {
  return raw.order?.id ?? raw.order_id;
}

function resolveOrderCode(raw: RawTicket): string {
  return raw.order?.code ?? String(raw.order_id);
}

function resolveClientOrderId(raw: RawTicket): string {
  return raw.order?.client_order_id ?? "-";
}

function resolveClientName(raw: RawTicket): string | null {
  return raw.client?.user?.name ?? raw.client?.owner_name ?? null;
}

function resolveShopName(raw: RawTicket): string {
  return raw.order?.shop?.name ?? "-";
}

function resolveDeliveryType(raw: RawTicket): string {
  return raw.order?.delivery_type ?? "-";
}

function resolvePaymentMode(raw: RawTicket): string | undefined {
  return raw.order?.payment_mode ?? undefined;
}

function resolveOpenedAt(raw: RawTicket): string | undefined {
  return raw.opened_at ?? raw.created_at;
}

function resolveStatus(raw: RawTicket) {
  if (raw.closed_at) return { name: "Closed", class: "closed" };
  if (raw.taken_by) return { name: "In Progress", class: "in-progress" };
  if (raw.opened_at) return { name: "Open", class: "open" };
  return { name: "New", class: "new" };
}

function resolveEngagedByName(raw: RawTicket): string | null {
  return raw.taken_by_user?.name ?? null;
}

function resolveCustomerName(raw: RawTicket): string | undefined {
  return raw.client?.contact_name ?? raw.client?.owner_name ?? undefined;
}

function resolveCustomerNumber(raw: RawTicket): string | undefined {
  return (
    raw.client?.mobile_number ?? raw.client?.contact_mobile_no ?? undefined
  );
}

function resolveCustomerEmail(raw: RawTicket): string | undefined {
  return raw.client?.email ?? raw.client?.contact_email ?? undefined;
}

function resolveCustomerAddress(raw: RawTicket): string | undefined {
  return raw.client?.address ?? undefined;
}

function mapTicket(raw: RawTicket): TicketOrder {
  const openedAt = resolveOpenedAt(raw);

  return {
    id: raw.id,
    order_db_id: resolveOrderDbId(raw),
    order_id: resolveOrderCode(raw),
    client_order_id: resolveClientOrderId(raw),
    client_name: resolveClientName(raw),
    shop_name: resolveShopName(raw),
    area: raw.order?.shop?.region,
    zone: raw.order?.shop?.zone,
    delivery_type: resolveDeliveryType(raw),
    payment_mode: resolvePaymentMode(raw),
    opened_at: openedAt,
    taken_at: raw.taken_at,
    taken_by: raw.taken_by,
    engaged_by_name: resolveEngagedByName(raw),
    not_seen_messages_count: raw.not_seen_messages_count ?? 0,
    closed_at: raw.closed_at,
    created_at: openedAt,
    updated_at: raw.updated_at,
    type: raw.type,
    captain_id: raw.captain_id,
    status: resolveStatus(raw),
    captain: resolveCaptain(raw),
    issue_title: raw.subject ?? undefined,
    customer_name: resolveCustomerName(raw),
    customer_number: resolveCustomerNumber(raw),
    customer_email: resolveCustomerEmail(raw),
    customer_address: resolveCustomerAddress(raw),
    messages: [],
  };
}

export default function useTicketsList() {
  const query = useQuery({
    queryKey: ["tickets-list"],
    queryFn: () => getTickets(),
    placeholderData: keepPreviousData,
    staleTime: 0,
  });

  const tickets = (query.data?.data.tickets ?? []).map(mapTicket);
  const messageCounts: TicketsMessageCounts = query.data?.data
    .messageCounts ?? {
    ticket: 0,
    pending: 0,
    client: 0,
  };

  return {
    data: tickets,
    messageCounts,
    isLoading: query.isLoading || query.isFetching,
    error: query.error,
  };
}

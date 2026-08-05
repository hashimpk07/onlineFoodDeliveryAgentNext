"use client";

import { useMemo, useState } from "react";

import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { TicketOrder, TicketsMessageCounts } from "../_types";

type TicketTab = "all" | "tickets" | "pending" | "client";

interface TicketListPanelProps {
  tickets: TicketOrder[];
  messageCounts: TicketsMessageCounts;
  selectedId: number | null;
  onSelect: (ticket: TicketOrder) => void;
}

/**
 * The backend encodes the tab category directly on `type`:
 * 1 = Tickets, 2 = Pending, 3 = Client Tickets.
 */
const TICKET_TYPE = {
  tickets: 1,
  pending: 2,
  client: 3,
} as const;

function formatOpenedAt(value?: string): string {
  if (!value) return "-";
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

function statusBadgeVariant(status?: string) {
  const normalized = status?.toLowerCase() ?? "";
  if (normalized.includes("progress")) return "default" as const;
  if (normalized === "open") return "success" as const;
  if (normalized === "new") return "destructive" as const;
  return "outline" as const;
}

function ticketTypeLabel(type: number): string {
  if (type === 1) return "TICKET";
  if (type === 2) return "PENDING";
  return "ISSUE ID";
}

function TicketCardDetails({ ticket }: { ticket: TicketOrder }) {
  return (
    <>
      {ticket.captain?.name && (
        <p className="mt-1 text-sm">
          <span className="font-semibold">CAPTAIN: </span>
          {ticket.captain.name}
        </p>
      )}

      {ticket.type === 3 && ticket.client_name && (
        <p className="text-sm">
          <span className="font-semibold">CLIENT: </span>
          {ticket.client_name}
        </p>
      )}

      {ticket.type === 3 && ticket.shop_name && (
        <p className="text-sm">
          <span className="font-semibold">SHOP: </span>
          {ticket.shop_name}
        </p>
      )}
    </>
  );
}

function TicketCardStatus({
  ticket,
  awb,
}: {
  ticket: TicketOrder;
  awb: string;
}) {
  return (
    <div className="mt-1 flex items-center justify-between gap-2">
      <p className="text-sm">
        <span className="font-semibold">AWB: </span>
        {awb}
      </p>
      <div className="flex items-center gap-1.5">
        <Badge variant={statusBadgeVariant(ticket.status?.name)}>
          {ticket.status?.name ?? "-"}
        </Badge>
        {ticket.not_seen_messages_count > 0 && (
          <Badge
            variant="destructive"
            className="bg-amber-500 hover:bg-amber-500/90"
          >
            {ticket.not_seen_messages_count}
          </Badge>
        )}
      </div>
    </div>
  );
}

function TicketCard({
  ticket,
  active,
  onSelect,
}: {
  ticket: TicketOrder;
  active: boolean;
  onSelect: () => void;
}) {
  const awb = ticket.client_order_id ?? ticket.order_id;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "rounded-lg border p-3 text-left transition-colors hover:bg-accent",
        active && "border-primary bg-primary/10",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold text-primary">
          {ticketTypeLabel(ticket.type)} {ticket.id}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatOpenedAt(ticket.opened_at)}
        </span>
      </div>

      <TicketCardDetails ticket={ticket} />
      <TicketCardStatus ticket={ticket} awb={awb} />

      {ticket.engaged_by_name && (
        <p className="mt-1 text-right text-xs text-muted-foreground">
          <span className="font-semibold">ENGAGED: </span>
          {ticket.engaged_by_name}
        </p>
      )}
    </button>
  );
}

export function TicketListPanel({
  tickets,
  messageCounts,
  selectedId,
  onSelect,
}: TicketListPanelProps) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TicketTab>("all");

  const searched = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return tickets;

    return tickets.filter((t) =>
      [
        t.order_id,
        t.client_order_id,
        t.client_name,
        t.shop_name,
        t.captain?.name,
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(term)),
    );
  }, [tickets, search]);

  const openTickets = useMemo(
    () => searched.filter((t) => t.type === TICKET_TYPE.tickets),
    [searched],
  );
  const pendingTickets = useMemo(
    () => searched.filter((t) => t.type === TICKET_TYPE.pending),
    [searched],
  );
  const clientTickets = useMemo(
    () => searched.filter((t) => t.type === TICKET_TYPE.client),
    [searched],
  );

  const ticketsByTab: Record<TicketTab, TicketOrder[]> = {
    all: searched,
    tickets: openTickets,
    pending: pendingTickets,
    client: clientTickets,
  };
  const visible = ticketsByTab[tab];

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <Tabs value={tab} onValueChange={(v) => setTab(v as TicketTab)}>
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tickets" className="gap-1">
            <span className="truncate">Tickets</span>
            <Badge variant="secondary">{messageCounts.ticket}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-1">
            <span className="truncate">Pending</span>
            <Badge variant="secondary">{messageCounts.pending}</Badge>
          </TabsTrigger>
          <TabsTrigger value="client" className="gap-1">
            <span className="truncate">Client Tickets</span>
            <Badge variant="secondary">{messageCounts.client}</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search Tickets"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-2 pr-2">
          {visible.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No tickets found.
            </p>
          )}

          {visible.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              active={ticket.id === selectedId}
              onSelect={() => onSelect(ticket)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

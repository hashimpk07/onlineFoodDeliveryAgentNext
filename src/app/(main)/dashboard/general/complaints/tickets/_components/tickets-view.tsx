"use client";

import { useMemo, useState } from "react";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Card } from "@/components/ui/card";
import ErrorDisplay from "@/components/ui/error-display";

import useTicketsList from "../_hooks/use-tickets";
import { TicketOrder } from "../_types";

import { TicketConversationPanel } from "./ticket-conversation-panel";
import { TicketInfoPanel } from "./ticket-info-panel";
import { TicketListPanel } from "./ticket-list-panel";

export default function TicketsView() {
  const { data: tickets, messageCounts, isLoading, error } = useTicketsList();

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedTicket = useMemo(
    () => tickets.find((t) => t.id === selectedId) ?? tickets[0] ?? null,
    [tickets, selectedId],
  );

  if (error) {
    return (
      <ErrorDisplay
        title="Failed to load tickets"
        message={error.message || "Unknown error"}
      />
    );
  }

  if (isLoading) {
    return (
      <DataTableSkeleton
        columnCount={3}
        rowCount={8}
        searchableColumnCount={0}
        filterableColumnCount={0}
        showViewOptions={false}
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[420px_1fr_360px]">
      <Card className="h-[calc(100vh-220px)] min-h-[480px] p-4">
        <TicketListPanel
          tickets={tickets}
          messageCounts={messageCounts}
          selectedId={selectedTicket?.id ?? null}
          onSelect={(ticket: TicketOrder) => setSelectedId(ticket.id)}
        />
      </Card>

      <Card className="h-[calc(100vh-220px)] min-h-[480px] p-4">
        <TicketConversationPanel ticket={selectedTicket} />
      </Card>

      <Card className="h-[calc(100vh-220px)] min-h-[480px] p-4">
        <TicketInfoPanel ticketId={selectedTicket?.id ?? null} />
      </Card>
    </div>
  );
}

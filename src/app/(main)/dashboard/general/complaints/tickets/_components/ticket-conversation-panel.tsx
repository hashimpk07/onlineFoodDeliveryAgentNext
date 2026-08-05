"use client";

import { useState } from "react";

import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { useTicketMessages } from "../_hooks/use-ticket-messages";
import { TicketMessage, TicketOrder } from "../_types";

interface TicketConversationPanelProps {
  ticket: TicketOrder | null;
}

function ticketTypeLabel(type: number): string {
  if (type === 1) return "TICKET";
  if (type === 2) return "PENDING";
  return "ISSUE ID";
}

function ticketTitle(ticket: TicketOrder): string {
  const prefix = `${ticketTypeLabel(ticket.type)} ${ticket.id}`;
  if (ticket.issue_title)
    return `${prefix} - ${ticket.issue_title.toUpperCase()}`;
  if (ticket.status?.name) {
    return `${prefix} - ${ticket.status.name.toUpperCase()} - ORDER #${ticket.order_id}`;
  }
  return `${prefix} - ORDER #${ticket.order_id}`;
}

function MessageBubble({ message }: { message: TicketMessage }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-0.5",
        message.is_own ? "items-end self-end" : "items-start self-start",
      )}
    >
      <div
        className={cn(
          "w-fit max-w-md rounded-lg px-4 py-2",
          message.is_own ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        <p className="text-sm font-semibold">{message.sender}</p>
        <p className="text-sm">{message.message}</p>
      </div>
      <p className="text-xs text-muted-foreground">{message.created_at}</p>
    </div>
  );
}

function ConversationBody({
  isLoading,
  isError,
  errorMessage,
  messages,
}: {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  messages: TicketMessage[];
}) {
  if (isLoading) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Loading conversation...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        {errorMessage ?? "Failed to load messages."}
      </p>
    );
  }

  if (messages.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No conversation yet.
      </p>
    );
  }

  return (
    <>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </>
  );
}

export function TicketConversationPanel({
  ticket,
}: TicketConversationPanelProps) {
  const [draft, setDraft] = useState("");

  const { messages, isLoading, isError, error, sendMessage, isSending } =
    useTicketMessages(ticket?.id ?? null);

  if (!ticket) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Select a ticket to view the conversation.
      </div>
    );
  }

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed || isSending) return;

    sendMessage(trimmed);
    setDraft("");
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {ticketTitle(ticket)}
        </h2>
        {ticket.engaged_by_name && (
          <span className="shrink-0 text-xs text-muted-foreground">
            <span className="font-semibold">ENGAGED: </span>
            {ticket.engaged_by_name}
          </span>
        )}
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-3 pr-2">
          <ConversationBody
            isLoading={isLoading}
            isError={isError}
            errorMessage={error?.message}
            messages={messages}
          />
        </div>
      </ScrollArea>

      <div className="flex items-center gap-2 border-t pt-3">
        <Input
          placeholder="Enter your text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          disabled={isSending}
        />
        <Button onClick={handleSend} className="gap-2" disabled={isSending}>
          Send
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}

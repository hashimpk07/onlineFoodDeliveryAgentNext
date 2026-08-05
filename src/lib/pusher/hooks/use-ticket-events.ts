"use client";

import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { getEchoInstance } from "../echo-instance";
import { PUSHER_CHANNELS, PUSHER_EVENTS } from "../pusher-config";
import { showNotification } from "../utils/notification-utils";
import { playSound, SoundType } from "../utils/sound-utils";

import type {
  NewTicketEvent,
  TicketClosedEvent,
  TicketUpdatedEvent,
} from "../types/pusher-types";

export function useTicketEvents({
  enabled = true,
}: { enabled?: boolean } = {}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) return;

    console.log("🎫 Setting up ticket events listener...");
    let echo;
    try {
      echo = getEchoInstance();
    } catch {
      return;
    }

    const channelName = PUSHER_CHANNELS.TICKET;
    console.log(`🔔 Subscribing to private channel: ${channelName}`);

    const channel = echo.private(channelName);

    // Listen for NewTicket event
    console.log(`👂 Listening for event: ${PUSHER_EVENTS.NEW_TICKET}`);
    channel.listen(PUSHER_EVENTS.NEW_TICKET, (e: NewTicketEvent) => {
      console.log("🎫 NewTicket event received:", e);
      const { ticket } = e;

      // Update ticket counts if you have state management
      // For now, just show notifications

      const type = ticket.type === 2 ? "Pending" : "Complaint";
      const ticketTypeLabel = ticket.type === 1 ? "ticket" : type;

      if (ticket.type === 2) {
        playSound(SoundType.PENDING);
      } else {
        playSound(SoundType.NEW_TICKET);
      }

      showNotification({
        heading: "New Ticket",
        text: `New ${ticketTypeLabel} from ${ticket.order.id}`,
        type: "error",
      });

      queryClient.invalidateQueries({ queryKey: ["tickets-list"] });
    });

    // Listen for TicketUpdated event
    console.log(`👂 Listening for event: ${PUSHER_EVENTS.TICKET_UPDATED}`);
    channel.listen(PUSHER_EVENTS.TICKET_UPDATED, (e: TicketUpdatedEvent) => {
      console.log("📝 TicketUpdated event received:", e);
      const { ticket } = e;
      if (
        ticket.not_seen_messages_count &&
        ticket.not_seen_messages_count > 0
      ) {
        playSound(SoundType.NEW_MESSAGE);
      }

      queryClient.invalidateQueries({ queryKey: ["tickets-list"] });
      queryClient.invalidateQueries({
        queryKey: ["ticket-messages", ticket.id],
      });
    });

    // Listen for TicketClosed event
    console.log(`👂 Listening for event: ${PUSHER_EVENTS.TICKET_CLOSED}`);
    channel.listen(PUSHER_EVENTS.TICKET_CLOSED, (e: TicketClosedEvent) => {
      console.log("🔒 TicketClosed event received:", e);
      queryClient.invalidateQueries({ queryKey: ["tickets-list"] });
    });

    console.log("✅ Ticket events listener setup complete");

    // Cleanup function
    return () => {
      console.log("🧹 Cleaning up ticket events listener...");
      channel.stopListening(PUSHER_EVENTS.NEW_TICKET);
      channel.stopListening(PUSHER_EVENTS.TICKET_UPDATED);
      channel.stopListening(PUSHER_EVENTS.TICKET_CLOSED);
    };
  }, [enabled, queryClient]);
}

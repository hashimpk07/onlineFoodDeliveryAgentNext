"use client";
import { useEffect, useRef } from "react";

import { getEchoInstance } from "@/lib/pusher/echo-instance";
import { PUSHER_EVENTS } from "@/lib/pusher/pusher-config";
import {
  NewOrderEvent,
  OrderStatusChangedEvent,
} from "@/lib/pusher/types/pusher-types";

interface UseClientOrderEventsOptions {
  onEvent?: () => void;
}

export function useClientOrderEvents(
  clientId: number | string | null,
  { onEvent }: UseClientOrderEventsOptions = {},
) {
  const onEventRef = useRef(onEvent);
  useEffect(() => {
    onEventRef.current = onEvent;
  }, [onEvent]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!clientId) return;

    console.log("📦 Setting up CLIENT order events listener...");
    let echo;
    try {
      echo = getEchoInstance();
    } catch {
      return;
    }
    const channelName = `orders.client.${clientId}`;
    console.log(`🔔 Subscribing to private channel: ${channelName}`);
    const channel = echo.private(channelName);

    channel.listen(PUSHER_EVENTS.NEW_ORDER, (e: NewOrderEvent) => {
      console.log("🆕 Client NewOrder event:", e);
      onEventRef.current?.();
    });

    channel.listen(
      PUSHER_EVENTS.ORDER_STATUS_CHANGED,
      (e: OrderStatusChangedEvent) => {
        console.log("📊 Client OrderStatusChanged event:", e);
        onEventRef.current?.();
      },
    );

    console.log("✅ Client order events listener ready");

    return () => {
      channel.stopListening(PUSHER_EVENTS.NEW_ORDER);
      channel.stopListening(PUSHER_EVENTS.ORDER_STATUS_CHANGED);
      channel.stopListening(PUSHER_EVENTS.CLIENT_DECLINED_RETURN);
      echo.leave(channelName);
    };
  }, [clientId]);
}

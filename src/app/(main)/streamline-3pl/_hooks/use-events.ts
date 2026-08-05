"use client";
import { useEffect, useRef } from "react";

import { getEchoInstance } from "@/lib/pusher/echo-instance";
import { PUSHER_EVENTS } from "@/lib/pusher/pusher-config";
import { OrderStatusChangedEvent } from "@/lib/pusher/types/pusher-types";

interface Use3plOrderEventsOptions {
  onEvent?: () => void;
}

export function use3plOrderEvents(
  companyId: number | string | null | undefined,
  { onEvent }: Use3plOrderEventsOptions = {},
) {
  const onEventRef = useRef(onEvent);
  useEffect(() => {
    onEventRef.current = onEvent;
  }, [onEvent]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!companyId) return;

    console.log("📦 Setting up 3PL order events listener...");
    let echo;
    try {
      echo = getEchoInstance();
    } catch {
      return;
    }
    const channelName = `orders.3pl.${companyId}`;
    console.log(`🔔 Subscribing to private channel: ${channelName}`);
    const channel = echo.private(channelName);

    channel.listen("CaptainOrderAssigned", (e: any) => {
      console.log("🆕 3PL CaptainOrderAssigned event:", e);
      onEventRef.current?.();
    });

    channel.listen(
      PUSHER_EVENTS.ORDER_STATUS_CHANGED,
      (e: OrderStatusChangedEvent) => {
        console.log("📊 3PL OrderStatusChanged event:", e);
        onEventRef.current?.();
      },
    );

    console.log("✅ 3PL order events listener ready");

    return () => {
      channel.stopListening("CaptainOrderAssigned");
      channel.stopListening(PUSHER_EVENTS.ORDER_STATUS_CHANGED);
      echo.leave(channelName);
    };
  }, [companyId]);
}

"use client";

import { useEffect } from "react";

import { getEchoInstance } from "@/lib/pusher/echo-instance";

import { PUSHER_CHANNELS, PUSHER_EVENTS } from "../pusher-config";
import { showNotification } from "../utils/notification-utils";
import { playSound, SoundType } from "../utils/sound-utils";

import type {
  ClientDeclinedReturnEvent,
  NewOrderEvent,
  OrderStatusChangedEvent,
} from "../types/pusher-types";

export function useOrderEvents({ enabled = true }: { enabled?: boolean } = {}) {
  useEffect(() => {
    if (typeof window === "undefined" || !enabled) return;

    console.log("📦 Setting up order events listener...");
    let echo;
    try {
      echo = getEchoInstance();
    } catch {
      return;
    }

    const channelName = PUSHER_CHANNELS.ORDERS;
    console.log(`🔔 Subscribing to private channel: ${channelName}`);

    const channel = echo.private(channelName);

    // Listen for NewOrder event
    console.log(`👂 Listening for event: ${PUSHER_EVENTS.NEW_ORDER}`);
    channel.listen(PUSHER_EVENTS.NEW_ORDER, (e: NewOrderEvent) => {
      console.log("🆕 NewOrder event received:", e);
      const { order } = e;
      playSound(SoundType.NEW_ORDER);
      showNotification({
        heading: "New Order",
        text: `New order from ${order.client} shop: ${order.shop}`,
        type: "info",
      });
    });

    // Listen for OrderStatusChanged event
    console.log(
      `👂 Listening for event: ${PUSHER_EVENTS.ORDER_STATUS_CHANGED}`,
    );
    channel.listen(
      PUSHER_EVENTS.ORDER_STATUS_CHANGED,
      (e: OrderStatusChangedEvent) => {
        console.log("📊 OrderStatusChanged event received:", e);
        const { order } = e;
        if (order.status_id === 18) {
          // Update pending orders count if you have a state management solution
          // For now, just show notification
          showNotification({
            heading: "Order Status Changed To Pending",
            text: `Order from ${order.client} shop: ${order.shop} is now pending please resolve as soon as possible`,
            type: "error",
          });
        }
      },
    );

    // Listen for ClientDeclinedReturn event
    console.log(
      `👂 Listening for event: ${PUSHER_EVENTS.CLIENT_DECLINED_RETURN}`,
    );
    channel.listen(
      PUSHER_EVENTS.CLIENT_DECLINED_RETURN,
      (e: ClientDeclinedReturnEvent) => {
        console.log("↩️ ClientDeclinedReturn event received:", e);
        const { order } = e;
        playSound(SoundType.PENDING);
        showNotification({
          heading: "Client Return Declined",
          text: `Order ${order.awb} from ${order.client} shop: ${order.shop} is return declined by client`,
          type: "warning",
          duration: 10000,
        });
      },
    );

    console.log("✅ Order events listener setup complete");

    // Cleanup function
    return () => {
      console.log("🧹 Cleaning up order events listener...");
      channel.stopListening(PUSHER_EVENTS.NEW_ORDER);
      channel.stopListening(PUSHER_EVENTS.ORDER_STATUS_CHANGED);
      channel.stopListening(PUSHER_EVENTS.CLIENT_DECLINED_RETURN);
    };
  }, [enabled]);
}

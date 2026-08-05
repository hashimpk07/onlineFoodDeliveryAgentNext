"use client";

import { useEffect } from "react";

import { getEchoInstance } from "../echo-instance";
import { PUSHER_EVENTS } from "../pusher-config";
import { showNotification } from "../utils/notification-utils";
import { playSound, SoundType } from "../utils/sound-utils";

import type {
  OrderAcceptingTimeOutedEvent,
  OrderRejectedEvent,
} from "../types/pusher-types";

interface UseUserEventsOptions {
  userChannel: string; // e.g., "user.123" or however your backend formats it
}

export function useUserEvents({ userChannel }: UseUserEventsOptions) {
  useEffect(() => {
    if (typeof window === "undefined" || !userChannel) {
      console.log("⚠️ User events skipped - no userChannel provided");
      return;
    }

    console.log("👤 Setting up user events listener...");
    let echo;
    try {
      echo = getEchoInstance();
    } catch {
      return;
    }

    console.log(`🔔 Subscribing to private channel: ${userChannel}`);
    const channel = echo.private(userChannel);

    // Listen for OrderAcceptingTimeOuted event
    console.log(
      `👂 Listening for event: ${PUSHER_EVENTS.ORDER_ACCEPTING_TIME_OUTED}`,
    );
    channel.listen(
      PUSHER_EVENTS.ORDER_ACCEPTING_TIME_OUTED,
      (e: OrderAcceptingTimeOutedEvent) => {
        console.log("⏰ OrderAcceptingTimeOuted event received:", e);
        const { order } = e;
        playSound(SoundType.PENDING);
        showNotification({
          heading: "Captain Waiting Time Outed",
          text: `Order ${order.client_order_id} from ${order.client} shop: ${order.shop} is captain order accepting time expired`,
          type: "warning",
          duration: 10000,
        });
      },
    );

    // Listen for OrderRejected event
    console.log(`👂 Listening for event: ${PUSHER_EVENTS.ORDER_REJECTED}`);
    channel.listen(PUSHER_EVENTS.ORDER_REJECTED, (e: OrderRejectedEvent) => {
      console.log("❌ OrderRejected event received:", e);
      const { order } = e;
      playSound(SoundType.PENDING);
      showNotification({
        heading: "Captain Rejected the Order",
        text: `Order ${order.client_order_id} from ${order.client} shop: ${order.shop} is rejected by captain`,
        type: "warning",
        duration: 10000,
      });
    });

    console.log("✅ User events listener setup complete");

    // Cleanup function
    return () => {
      console.log("🧹 Cleaning up user events listener...");
      channel.stopListening(PUSHER_EVENTS.ORDER_ACCEPTING_TIME_OUTED);
      channel.stopListening(PUSHER_EVENTS.ORDER_REJECTED);
    };
  }, [userChannel]);
}

"use client";

import { ReactNode, useEffect } from "react";

import { useUser } from "@/hooks/use-user";
import { useOrderEvents, useTicketEvents } from "@/lib/pusher";

import { preloadSounds } from "../lib/pusher/utils/sound-utils";

interface PusherProviderProps {
  children: ReactNode;
  userChannel?: string; // Optional: pass user channel for user-specific events
}

export function PusherProvider({ children, userChannel }: PusherProviderProps) {
  const { user, isAuthenticated } = useUser();
  const isClientOr3pl = user?.role === "client" || user?.role === "3pl";
  const shouldSubscribeGlobal = isAuthenticated ? !isClientOr3pl : false;

  // Initialize event listeners
  useOrderEvents({ enabled: shouldSubscribeGlobal });
  useTicketEvents({ enabled: shouldSubscribeGlobal });

  // Only use user events if userChannel is provided
  // useUserEvents({ userChannel: userChannel || "" });

  // Preload sounds on mount
  useEffect(() => {
    preloadSounds();
  }, []);

  return <>{children}</>;
}

import Echo from "laravel-echo";
import Pusher from "pusher-js";

import { getSessionCookie } from "@/lib/pusher/utils/auth-utils";

// Make Pusher available globally for Laravel Echo
if (typeof window !== "undefined") {
  (window as any).Pusher = Pusher;
}

let echoInstance: Echo<any> | null = null;

export function getEchoInstance(): Echo<any> {
  if (typeof window === "undefined") {
    throw new Error("Echo can only be initialized on the client side");
  }

  if (!echoInstance) {
    const appKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
    const appCluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;

    if (!appKey || !appCluster) {
      console.warn(
        "⚠️ Pusher env vars not configured (NEXT_PUBLIC_PUSHER_APP_KEY / NEXT_PUBLIC_PUSHER_APP_CLUSTER). Real-time features disabled.",
      );
      throw new Error("Pusher is not configured");
    }

    console.log("🔌 Initializing Pusher Echo instance...");

    // Get encrypted session cookie for authentication
    const sessionCookie = getSessionCookie();
    console.log("🔑 Session cookie:", sessionCookie ? "Found" : "Not found");

    const config = {
      broadcaster: "pusher" as const,
      key: appKey,
      cluster: appCluster,
      forceTLS: true,
      // Authentication for private channels via Next.js API proxy
      authEndpoint: "/api/broadcasting/auth",
    };

    console.log("📋 Pusher config:", config);

    echoInstance = new Echo(config as any);

    // Access the underlying Pusher connection for debugging
    const pusher = (echoInstance as any).connector.pusher;

    // Log connection state changes
    pusher.connection.bind("state_change", (states: any) => {
      console.log("🔄 Pusher state changed:", {
        previous: states.previous,
        current: states.current,
      });
    });

    // Log successful connection
    pusher.connection.bind("connected", () => {
      console.log("✅ Pusher connected successfully!");
      console.log("📡 Socket ID:", pusher.connection.socket_id);
    });

    // Log connection errors
    pusher.connection.bind("error", (err: any) => {
      console.log("❌ Pusher connection error");

      console.log("Type:", err?.type);
      console.log("Code:", err?.data?.code);
      console.log("Message:", err?.data?.message);
      console.log("Full error:", JSON.stringify(err, null, 2));
    });

    // Global event logger
    pusher.bind_global((eventName: string, data: any) => {
      // Ignore internal pusher events like pusher:pong and pusher:ping
      if (eventName.startsWith("pusher:")) return;
      console.log(`🌐 [PUSHER GLOBAL] Event: ${eventName}`, data);
    });

    // Note: removed hardcoded subscription to private-orders

    // Log disconnection
    pusher.connection.bind("disconnected", () => {
      console.warn("⚠️ Pusher disconnected");
    });

    // Log failed connection
    pusher.connection.bind("failed", () => {
      console.log("💥 Pusher connection failed");
    });
  } else {
    console.log("♻️ Reusing existing Echo instance");
  }

  return echoInstance;
}

export function disconnectEcho(): void {
  if (echoInstance) {
    console.log("🔌 Disconnecting Echo instance...");
    echoInstance.disconnect();
    echoInstance = null;
  }
}

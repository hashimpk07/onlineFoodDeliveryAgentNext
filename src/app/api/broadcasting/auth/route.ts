import { NextRequest, NextResponse } from "next/server";

import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    // Echo sends form-urlencoded data
    const formData = await request.formData();
    const socket_id = formData.get("socket_id") as string;
    const channel_name = formData.get("channel_name") as string;

    console.warn("🔐 Broadcasting auth request:", {
      socket_id,
      channel_name,
    });

    // Convert to x-www-form-urlencoded
    const payload = new URLSearchParams({
      socket_id,
      channel_name,
    });
    const session = await getSession();
    const token = session?.token;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER ?? "https://sandbox.4ulogistic.com/api"}/broadcasting/auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: payload.toString(),
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Broadcasting auth failed:", data);

      return NextResponse.json(
        {
          error: "Authentication failed",
          message: data?.message ?? "Broadcast auth failed",
        },
        { status: response.status },
      );
    }

    console.warn("✅ Broadcasting auth successful");
    console.warn("Broadcast auth response data:", data);
    return NextResponse.json(data);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Broadcasting auth exception:", error);

    return NextResponse.json(
      {
        error: "Authentication failed",
        message: errorMessage,
      },
      { status: 500 },
    );
  }
}

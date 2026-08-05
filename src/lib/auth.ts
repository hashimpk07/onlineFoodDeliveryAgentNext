"use server";

import { LoginSchema } from "@/app/[locale]/(main)/auth/_schema";
import {
  LaravelLoginResponse,
  LoginUser,
  SessionPayload,
} from "@/app/[locale]/(main)/auth/_types";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function validateLoginInput(email: string, password: string) {
  return LoginSchema.parse({ email, password });
}

export async function extractUserData(response: LaravelLoginResponse) {
  if (response.status !== "success" || !response.data?.[0]) {
    throw new Error(response.message || "Login failed");
  }
  return response.data[0];
}

export async function formatSession(
  user: LoginUser,
  token: string,
): Promise<SessionPayload> {
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role.name,
    token,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    avatar: user.avatar,
  };
}

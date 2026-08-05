// session.ts
"use server";

import { SignJWT, jwtVerify } from "jose";

import { SessionPayload } from "@/app/[locale]/(main)/auth/_types";
import {
  deleteCookie,
  getValueFromCookie,
  setValueToCookie,
} from "@/lib/cookie-actions";

const secret =
  process.env.SESSION_SECRET ?? "your-secret-key-min-32-chars-long!";
const encodedKey = new TextEncoder().encode(secret);

// Encrypt session JWT
export async function encrypt(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

// Verify / decrypt
export async function decrypt(token?: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token ?? "", encodedKey);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

// Create & store session cookie
export async function createSession(payload: SessionPayload) {
  const token = await encrypt(payload);

  await setValueToCookie("session", token, {
    maxAge: 60 * 60 * 24, // 1 days
  });
}

// Retrieve session
export async function getSession() {
  const token = await getValueFromCookie("session");
  return token ? decrypt(token) : null;
}

// Logout
export async function deleteSession() {
  await deleteCookie("session");
}

// Refresh session
export async function refreshSession() {
  const session = await getSession();
  if (!session) throw new Error("No session to refresh");

  await deleteSession();
  await createSession(session);
}

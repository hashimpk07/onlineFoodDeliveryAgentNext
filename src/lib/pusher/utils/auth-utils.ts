/**
 * Get encrypted session cookie (client-side only)
 * Laravel backend will decrypt this to authenticate the private channel subscription
 */
export function getSessionCookie(): string | null {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const sessionCookie = cookies.find((row) => row.startsWith("session="));

  if (!sessionCookie) return null;

  const encryptedToken = sessionCookie.split("=")[1];
  return encryptedToken || null;
}

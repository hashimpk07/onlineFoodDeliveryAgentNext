/* eslint-disable */
import type { SessionPayload } from "@/app/[locale]/(main)/auth/_types";
import { getSession } from "@/lib/session";
import { is3plAllowedRoute, THIRD_PARTY_HOME } from "@/routes/3pl";
import { CLIENT_HOME, isClientAllowedRoute } from "@/routes/client";
import { i18nRouter } from "next-i18n-router";
import { NextRequest, NextResponse } from "next/server";
import { i18nConfig } from "./i18n-config";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const LOGIN_ROUTE = "/auth/login";
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  let path = pathname;
  const segments = path.split("/");

  if (segments.length > 1 && i18nConfig.locales.includes(segments[1])) {
    path = "/" + segments.slice(2).join("/");
    if (path === "/" || path === "") path = "/";
  }

  const cookieSession = request.cookies.get("session")?.value;
  const userSession: SessionPayload | null = cookieSession
    ? await getSession()
    : null;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );

  /** 🔐 No token OR expired session → redirect to login */
  if (isProtectedRoute && !userSession) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.nextUrl));
  }

  const role = userSession?.role;

  if (
    role === "client" /*&& path.startsWith("/dashboard") */ &&
    !isClientAllowedRoute(path)
  ) {
    return NextResponse.redirect(new URL(CLIENT_HOME, request.nextUrl));
  }

  if (
    role === "3pl-admin" /*&& path.startsWith("/dashboard") */ &&
    !is3plAllowedRoute(path)
  ) {
    return NextResponse.redirect(new URL(THIRD_PARTY_HOME, request.nextUrl));
  }

  if (path === "/" || path === "") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)).*)",
  ],
};

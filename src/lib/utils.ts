import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ApiResponse } from "@/types/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (str: string | null): string => {
  if (typeof str !== "string" || !str.trim()) return "?";

  return (
    str
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "?"
  );
};

export function formatCurrency(
  amount: number,
  opts?: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    noDecimals?: boolean;
  },
) {
  const {
    currency = "SAR",
    locale = "ar-SA",
    minimumFractionDigits,
    maximumFractionDigits,
    noDecimals,
  } = opts ?? {};

  const formatOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    minimumFractionDigits: noDecimals ? 0 : minimumFractionDigits,
    maximumFractionDigits: noDecimals ? 0 : maximumFractionDigits,
  };

  return new Intl.NumberFormat(locale, formatOptions).format(amount);
}

interface AxiosErrorLike {
  response?: { status?: number };
  message?: string;
}

export function cleanQueryParams(
  params: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
}

export function handleKpiApiError(
  error: unknown,
  defaultMessage: string,
  contextName: string,
): ApiResponse<unknown> {
  const err = error as AxiosErrorLike;
  const isRateLimit = err.response?.status === 429;

  if (!isRateLimit) {
    console.error(`${contextName} Error:`, err.message);
  }

  return {
    status: "error",
    message: isRateLimit
      ? "Rate limit exceeded. Please try again in a moment."
      : (err.message ?? defaultMessage),
    data: null,
  };
}

/* eslint-disable */
"use client";
"use no memo";
import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

function getCurrentDate() {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Riyadh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(now); // YYYY-MM-DD
}

export function useClientDashboardParams() {
  const [fromDate, setFromDate] = useQueryState(
    "from_date",
    parseAsString.withDefault(getCurrentDate()),
  );

  const [toDate, setToDate] = useQueryState(
    "to_date",
    parseAsString.withDefault(getCurrentDate()),
  );

  /* ───────────── Reset ───────────── */
  const resetFilters = useCallback(() => {
    setFromDate(getCurrentDate());
    setToDate(getCurrentDate());
  }, []);

  /* ───────────── Active check ───────────── */
  const isAnyFilterActive = useMemo(
    () =>
      !!(
        (fromDate && fromDate !== getCurrentDate()) ||
        (toDate && toDate !== getCurrentDate())
      ),
    [fromDate, toDate],
  );

  /* ───────────── API-ready filters ───────────── */
  const filters = useMemo(
    () => ({
      ...(fromDate && { from_date: fromDate }),
      ...(toDate && { to_date: toDate }),
    }),
    [fromDate, toDate],
  );

  return {
    /* values */
    fromDate,
    toDate,
    /* setters */
    setFromDate,
    setToDate,
    /* helpers */
    filters,
    resetFilters,
    isAnyFilterActive,
  };
}

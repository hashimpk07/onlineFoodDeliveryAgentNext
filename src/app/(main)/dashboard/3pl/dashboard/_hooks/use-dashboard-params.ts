/* eslint-disable */
"use client";
"use no memo";
import { parseAsString, useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

// Helper functions to get default dates
function getStartOfMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}-01`;
}

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

export function useDashboardParams() {
  const [fromDate, setFromDate] = useQueryState(
    "from_date",
    parseAsString.withDefault(getCurrentDate()),
  );

  const [toDate, setToDate] = useQueryState(
    "to_date",
    parseAsString.withDefault(getCurrentDate()),
  );

  const [regionId, setRegionId] = useQueryState(
    "region_id",
    parseAsString.withDefault(""),
  );

  /* ───────────── Reset ───────────── */
  const resetFilters = useCallback(() => {
    setRegionId(null);
    setFromDate(getCurrentDate());
    setToDate(getCurrentDate());
  }, []);

  /* ───────────── Active check ───────────── */
  const isAnyFilterActive = useMemo(
    () =>
      !!(
        regionId ||
        (fromDate && fromDate !== getCurrentDate()) ||
        (toDate && toDate !== getCurrentDate())
      ),
    [regionId, fromDate, toDate],
  );

  /* ───────────── API-ready filters ───────────── */
  const filters = useMemo(
    () => ({
      regions: regionId || undefined,
      ...(fromDate && { from_date: fromDate }),
      ...(toDate && { to_date: toDate }),
    }),
    [regionId, fromDate, toDate],
  );

  return {
    /* values */
    fromDate,
    toDate,
    regionId,
    /* setters */
    setRegionId,
    setFromDate,
    setToDate,
    /* helpers */
    filters,
    resetFilters,
    isAnyFilterActive,
  };
}

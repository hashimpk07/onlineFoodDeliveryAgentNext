/* eslint-disable */
"use client";
"use no memo";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
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
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function useWorkingDaysParams() {
  const [fromDate, setFromDate] = useQueryState(
    "from_date",
    parseAsString.withDefault(getStartOfMonth()),
  );

  const [toDate, setToDate] = useQueryState(
    "to_date",
    parseAsString.withDefault(getCurrentDate()),
  );

  const [captainId, setCaptainId] = useQueryState(
    "captain_id",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [regionId, setRegionId] = useQueryState(
    "region_id",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [areaId, setAreaId] = useQueryState(
    "area_id",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [workStatus, setWorkStatus] = useQueryState(
    "work_status",
    parseAsString.withDefault(""),
  );

  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(DEFAULT_PAGE),
  );

  const [pageSize, setPageSize] = useQueryState(
    "per_page",
    parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  );

  /* ───────────── Reset ───────────── */
  const resetFilters = useCallback(() => {
    setCaptainId(null);
    setRegionId(null);
    setAreaId(null);
    setWorkStatus(null);
    setPage(DEFAULT_PAGE);
    setPageSize(DEFAULT_PAGE_SIZE);
    setFromDate(getStartOfMonth());
    setToDate(getCurrentDate());
  }, []);

  /* ───────────── Active check ───────────── */
  const isAnyFilterActive = useMemo(
    () =>
      !!(
        captainId.length > 0 ||
        regionId.length > 0 ||
        areaId.length > 0 ||
        workStatus ||
        page !== DEFAULT_PAGE ||
        pageSize !== DEFAULT_PAGE_SIZE ||
        (fromDate && fromDate !== getStartOfMonth()) ||
        (toDate && toDate !== getCurrentDate())
      ),
    [captainId, regionId, areaId, workStatus, page, pageSize, fromDate, toDate],
  );

  /* ───────────── API-ready filters ───────────── */
  const filters = useMemo(
    () => ({
      captain_id: captainId.length ? captainId : undefined,
      regions: regionId.length ? regionId : undefined,
      areas_id: areaId.length ? areaId : undefined,
      status: workStatus || undefined,
      ...(fromDate && { from_date: fromDate }),
      ...(toDate && { to_date: toDate }),
    }),
    [captainId, regionId, areaId, workStatus, fromDate, toDate],
  );

  return {
    /* values */
    fromDate,
    toDate,
    captainId,
    regionId,
    areaId,
    workStatus,
    page,
    pageSize,
    /* setters */
    setCaptainId,
    setRegionId,
    setAreaId,
    setWorkStatus,
    setPage,
    setPageSize,
    setFromDate,
    setToDate,
    /* helpers */
    filters,
    resetFilters,
    isAnyFilterActive,
  };
}

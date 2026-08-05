/* eslint-disable */
"use client";
"use no memo";
import { SortingState } from "@tanstack/react-table";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
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

const SORTABLE_COLUMNS = ["acceptance_rate", "success_rate"] as const;
type SortableColumn = (typeof SORTABLE_COLUMNS)[number];
type SortDirection = "asc" | "desc";

export function useCaptainPerformanceParams() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
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

  /* ───────────── Sorting ───────────── */
  const [sortBy, setSortBy] = useQueryState(
    "sort_by",
    parseAsStringEnum<SortableColumn>([...SORTABLE_COLUMNS]).withDefault(
      "" as SortableColumn, // no default sort
    ),
  );
  const [sortDir, setSortDir] = useQueryState(
    "sort_dir",
    parseAsStringEnum<SortDirection>(["asc", "desc"]).withDefault("asc"),
  );

  // TanStack-compatible sorting state
  const sorting: SortingState = useMemo(
    () => (sortBy ? [{ id: sortBy, desc: sortDir === "desc" }] : []),
    [sortBy, sortDir],
  );

  // Called by onSortingChange from useDataTableInstance
  const setSorting = useCallback(
    (updater: SortingState | ((prev: SortingState) => SortingState)) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;

      if (next.length === 0) {
        setSortBy(null); // clears the param from URL
        setSortDir(null);
      } else {
        setSortBy(next[0].id as SortableColumn);
        setSortDir(next[0].desc ? "desc" : "asc");
      }
    },
    [sorting, setSortBy, setSortDir],
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
    setSearch(null);
    setCaptainId(null);
    setRegionId(null);
    setAreaId(null);
    setWorkStatus(null);
    setPage(DEFAULT_PAGE);
    setPageSize(DEFAULT_PAGE_SIZE);
    setFromDate(getStartOfMonth());
    setToDate(getCurrentDate());
    setSortBy(null); // ✅ also clear sorting on reset
    setSortDir(null);
  }, []);

  /* ───────────── Active check ───────────── */
  const isAnyFilterActive = useMemo(
    () =>
      !!(
        search ||
        captainId ||
        regionId ||
        areaId ||
        workStatus ||
        page !== DEFAULT_PAGE ||
        pageSize !== DEFAULT_PAGE_SIZE ||
        (fromDate && fromDate !== getStartOfMonth()) ||
        (toDate && toDate !== getCurrentDate()) ||
        sortBy ||
        sortDir
      ),
    [
      search,
      captainId,
      regionId,
      areaId,
      workStatus,
      page,
      pageSize,
      fromDate,
      toDate,
      sortBy,
      sortDir,
    ],
  );

  /* ───────────── API-ready filters ───────────── */
  const filters = useMemo(
    () => ({
      ...(search && { q: search }),
      captain: captainId || undefined,
      regions: regionId || undefined,
      status: workStatus || undefined,
      areas_id: areaId || undefined,
      ...(fromDate && { from_date: fromDate }),
      ...(toDate && { to_date: toDate }),
      sort_by: sortBy || undefined,
      sort_dir: sortDir || undefined,
    }),
    [search, captainId, workStatus, regionId, areaId, fromDate, toDate],
  );

  return {
    /* values */
    search,
    fromDate,
    toDate,
    captainId,
    regionId,
    areaId,
    workStatus,
    page,
    pageSize,
    sorting, // ✅ TanStack SortingState
    sortBy, // ✅ raw string for API
    sortDir, // ✅ raw "asc" | "desc" for API
    /* setters */
    setSearch,
    setCaptainId,
    setRegionId,
    setAreaId,
    setWorkStatus,
    setPage,
    setPageSize,
    setFromDate,
    setToDate,
    setSorting, // ✅ TanStack-compatible setter
    /* helpers */
    filters,
    resetFilters,
    isAnyFilterActive,
  };
}

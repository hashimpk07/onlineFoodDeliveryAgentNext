"use client";

import { useCallback, useMemo } from "react";

import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

export function useOrdersUrlParams() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [fromDate, setFromDate] = useQueryState(
    "from_date",
    parseAsString.withDefault(""),
  );
  const [toDate, setToDate] = useQueryState(
    "to_date",
    parseAsString.withDefault(""),
  );
  const [shopname, setShopname] = useQueryState(
    "shopname",
    parseAsString.withDefault(""),
  );
  const [status, setStatus] = useQueryState(
    "status",
    parseAsArrayOf(parseAsString).withDefault([]),
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

  const filters = useMemo(
    () => ({
      ...(search && { q: search }),
      ...(fromDate && { from_date: fromDate }),
      ...(toDate && { to_date: toDate }),
      ...(shopname && { shopname }),
      ...(status.length > 0 && { status }),
      ...(page !== DEFAULT_PAGE && { page }),
      ...(pageSize !== DEFAULT_PAGE_SIZE && { per_page: pageSize }),
    }),
    [search, fromDate, toDate, shopname, status, page, pageSize],
  );

  const resetFilters = useCallback(() => {
    setSearch("");
    setFromDate("");
    setToDate("");
    setShopname("");
    setStatus([]);
    setPage(DEFAULT_PAGE);
    setPageSize(DEFAULT_PAGE_SIZE);
  }, [
    setSearch,
    setFromDate,
    setToDate,
    setShopname,
    setStatus,
    setPage,
    setPageSize,
  ]);

  const isAnyFilterActive = useMemo(
    () => Object.keys(filters).length > 0,
    [filters],
  );

  return {
    // UI values
    search,
    fromDate,
    toDate,
    shopname,
    status,
    page,
    pageSize,

    filters,

    // setters
    setSearch,
    setFromDate,
    setToDate,
    setShopname,
    setStatus,
    setPage,
    setPageSize,

    resetFilters,
    isAnyFilterActive,
  };
}

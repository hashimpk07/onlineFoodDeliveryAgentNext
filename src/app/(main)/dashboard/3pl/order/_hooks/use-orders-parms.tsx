/* eslint-disable */

"use client";
"use no memo";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export function useOrdersUrlParams() {
  /* ───────────── Search ───────────── */
  const [orderId, setOrderId] = useQueryState(
    "orderID",
    parseAsString.withDefault(""),
  );
  const [captain, setCaptain] = useQueryState(
    "captain",
    parseAsString.withDefault(""),
  );

  /* ───────────── Single-value filters ───────────── */
  const [orderType, setOrderType] = useQueryState(
    "order_type",
    parseAsString.withDefault(""),
  );

  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault(""),
  );

  const [fromdate, setFromDate] = useQueryState(
    "from_date",
    parseAsString.withDefault(""),
  );

  const [endDate, setEndDate] = useQueryState(
    "to_date",
    parseAsString.withDefault(""),
  );
  /* ───────────── Pagination ───────────── */
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
    setOrderId("");
    setCaptain("");
    setOrderType(null);
    setStatus(null);
    setFromDate(null);
    setEndDate(null);
    setPage(DEFAULT_PAGE);
    setPageSize(DEFAULT_PAGE_SIZE);
  }, []);

  /* ───────────── Active check ───────────── */
  const isAnyFilterActive = useMemo(
    () =>
      !!(
        orderId ||
        captain ||
        orderType ||
        status ||
        fromdate ||
        endDate ||
        page !== DEFAULT_PAGE ||
        pageSize !== DEFAULT_PAGE_SIZE
      ),
    [orderId, captain, orderType, status, fromdate, endDate, page, pageSize],
  );

  /* ───────────── API-ready filters ───────────── */
  const filters = useMemo(
    () => ({
      orderID: orderId || undefined,
      captain: captain || undefined,
      status: status || undefined,
      order_type: orderType || undefined,
      from_date: fromdate || undefined,
      to_date: endDate || undefined,
    }),
    [orderId, captain, status, orderType, fromdate, endDate],
  );

  return {
    /* values */
    orderId,
    captain,
    status,
    orderType,
    fromdate,
    endDate,
    page,
    pageSize,

    /* setters */
    setOrderId,
    setCaptain,
    setStatus,
    setOrderType,
    setFromDate,
    setEndDate,
    setPage,
    setPageSize,

    /* helpers */
    filters,
    resetFilters,
    isAnyFilterActive,
  };
}

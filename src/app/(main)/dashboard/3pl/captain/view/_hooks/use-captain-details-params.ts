/* eslint-disable */

"use client";
"use no memo";

import { useParams } from "next/navigation";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export function useCaptainDetailUrlParams() {
  /* ───────────── Pagination ───────────── */
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;
  const params = useParams();

  const [fromDate, setFromDate] = useQueryState(
    "from_date",
    parseAsString.withDefault(""),
  );

  const [toDate, setToDate] = useQueryState(
    "to_date",
    parseAsString.withDefault(""),
  );

  const [shift_page, setShiftPage] = useQueryState(
    "shift_page",
    parseAsInteger.withDefault(DEFAULT_PAGE),
  );

  const [shiftPageSize, setShiftPageSize] = useQueryState(
    "shift_per_page",
    parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  );

  const [order_page, setOrderPage] = useQueryState(
    "order_page",
    parseAsInteger.withDefault(DEFAULT_PAGE),
  );

  const [orderPageSize, setOrderPageSize] = useQueryState(
    "order_per_page",
    parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  );

  /* ───────────── Reset ───────────── */
  const resetFilters = useCallback(() => {
    setShiftPage(DEFAULT_PAGE);
    setShiftPageSize(DEFAULT_PAGE_SIZE);
    setOrderPage(DEFAULT_PAGE);
    setOrderPageSize(DEFAULT_PAGE_SIZE);
    setFromDate("");
    setToDate("");
  }, []);

  /* ───────────── Active check ───────────── */
  const isAnyFilterActive = useMemo(
    () =>
      !!(
        toDate !== "" ||
        fromDate != "" ||
        shift_page !== DEFAULT_PAGE ||
        shiftPageSize !== DEFAULT_PAGE_SIZE ||
        order_page !== DEFAULT_PAGE ||
        orderPageSize !== DEFAULT_PAGE_SIZE
      ),
    [fromDate, toDate, shift_page, order_page, shiftPageSize, orderPageSize],
  );

  /* ───────────── API-ready filters ───────────── */
  const filters = useMemo(
    () => ({
      from_date: fromDate,
      to_date: toDate,
    }),
    [fromDate, toDate],
  );

  return {
    setShiftPage,
    setOrderPage,
    setShiftPageSize,
    setOrderPageSize,
    setFromDate,
    setToDate,

    /* helpers */
    filters,
    resetFilters,
    isAnyFilterActive,

    fromDate,
    toDate,
    shift_page,
    order_page,
    orderPageSize,
    shiftPageSize,
    captain_id: params.id,
  };
}

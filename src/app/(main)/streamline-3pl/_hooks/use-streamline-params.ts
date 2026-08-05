"use client";

import { useCallback, useMemo } from "react";

import { parseAsString, useQueryState } from "nuqs";

export function use3plOrdersStreamlineParams() {
  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault("on_going_orders"),
  );
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );

  const [show, setShow] = useQueryState(
    "show",
    parseAsString.withDefault("all"),
  );
  const [order_search, setOrderSearch] = useQueryState(
    "order_search",
    parseAsString.withDefault(""),
  );

  const [order, setOrder] = useQueryState(
    "order",
    parseAsString.withDefault(""),
  );

  const filters = useMemo(
    () => ({
      ...(search && { search: search }),
      ...(status && { status: status }),
      ...(show && { show: show }),
      ...(order_search && { order_search: order_search }),
      ...(order && { order: order }),
    }),
    [search, status, show, order_search, order],
  );

  const resetFilters = useCallback(() => {
    setSearch("");
    setStatus("on_going_orders");
    setShow("all");
    setOrderSearch("");
    setOrder("");
  }, [setSearch, setStatus, setShow, setOrderSearch, setOrder]);

  const isAnyFilterActive = useMemo(
    () => Object.keys(filters).length > 0,
    [filters],
  );

  return {
    search,
    status,
    show,
    filters,
    order_search,
    setSearch,
    setOrderSearch,
    setStatus,
    resetFilters,
    setShow,
    isAnyFilterActive,
    order,
    setOrder,
  };
}

import { useCallback, useMemo } from "react";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export function useCompanyEarningParams() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  const [fromDate, setFromDate] = useQueryState(
    "from_date",
    parseAsString.withDefault(""),
  );

  const [toDate, setToDate] = useQueryState(
    "to_date",
    parseAsString.withDefault(""),
  );

  const [clientId, setClientId] = useQueryState(
    "client",
    parseAsString.withDefault(""),
  );

  const [shopId, setShopId] = useQueryState(
    "shop",
    parseAsString.withDefault(""),
  );

  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault(""),
  );

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [per_page, setPageSize] = useQueryState(
    "per_page",
    parseAsInteger.withDefault(20),
  );

  const resetFilters = useCallback(() => {
    setSearch(null);
    setFromDate(null);
    setToDate(null);
    setStatus(null);
    setClientId(null);
    setShopId(null);
    setPage(DEFAULT_PAGE);
  }, [
    setSearch,
    setFromDate,
    setToDate,
    setStatus,
    setClientId,
    setShopId,
    setPage,
    DEFAULT_PAGE,
  ]);

  const isAnyFilterActive = useMemo(
    () =>
      search !== "" ||
      fromDate !== "" ||
      toDate !== "" ||
      status !== "" ||
      clientId !== "" ||
      shopId !== "" ||
      page !== DEFAULT_PAGE ||
      per_page !== DEFAULT_PAGE_SIZE,
    [search, fromDate, toDate, status, clientId, shopId, page, per_page],
  );

  const filters = useMemo(
    () => ({
      search: search || undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      status: status || undefined,
      clientId: clientId || undefined,
      shopId: shopId || undefined,
    }),
    [search, fromDate, toDate, status, clientId, shopId],
  );

  return {
    search,
    fromDate,
    toDate,
    status,
    clientId,
    shopId,
    page,
    pageSize: per_page,
    filters,
    setSearch,
    setFromDate,
    setToDate,
    setStatus,
    setClientId,
    setShopId,
    setPage,
    setPageSize,
    resetFilters,
    isAnyFilterActive,
  };
}

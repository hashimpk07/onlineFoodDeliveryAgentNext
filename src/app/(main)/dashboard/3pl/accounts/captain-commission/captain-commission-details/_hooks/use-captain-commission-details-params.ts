import { useCallback, useMemo } from "react";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export function useCaptainCommissionDetailsParams() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [fromDate, setFromDate] = useQueryState(
    "from_date",
    parseAsString.withDefault(""),
  );

  const [toDate, setToDate] = useQueryState(
    "to_date",
    parseAsString.withDefault(""),
  );

  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  const [client, setClient] = useQueryState(
    "client",
    parseAsString.withDefault(""),
  );

  const [shop, setShop] = useQueryState("shop", parseAsString.withDefault(""));
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
    setFromDate(null);
    setToDate(null);
    setSearch(null);
    setClient(null);
    setShop(null);
    setStatus(null);
    setPage(DEFAULT_PAGE);
  }, [
    setFromDate,
    setToDate,
    setSearch,
    setClient,
    setPage,
    setShop,
    setStatus,
    DEFAULT_PAGE,
  ]);

  const isAnyFilterActive = useMemo(
    () =>
      fromDate !== "" ||
      toDate !== "" ||
      search !== "" ||
      client !== "" ||
      shop !== "" ||
      status !== "" ||
      page !== DEFAULT_PAGE ||
      per_page !== DEFAULT_PAGE_SIZE,
    [fromDate, toDate, search, client, shop, status, page, per_page],
  );

  const filters = useMemo(
    () => ({
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      search: search || undefined,
      shop: shop || undefined,
      client: client || undefined,
      status: status || undefined,
    }),
    [fromDate, toDate, search, shop, client, status],
  );

  return {
    fromDate,
    toDate,
    search,
    client,
    shop,
    status,
    page,
    pageSize: per_page,
    filters,
    setFromDate,
    setToDate,
    setSearch,
    setClient,
    setShop,
    setStatus,
    setPage,
    setPageSize,
    resetFilters,
    isAnyFilterActive,
  };
}

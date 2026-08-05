import { useCallback, useMemo } from "react";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export function useEmployeeParams() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [per_page, setPageSize] = useQueryState(
    "per_page",
    parseAsInteger.withDefault(20),
  );

  const resetFilters = useCallback(() => {
    setSearch(null);
    setPage(DEFAULT_PAGE);
  }, [setSearch, setPage, DEFAULT_PAGE]);

  const isAnyFilterActive = useMemo(
    () =>
      search !== "" || page !== DEFAULT_PAGE || per_page !== DEFAULT_PAGE_SIZE,
    [search, page, per_page],
  );

  const filters = useMemo(
    () => ({
      search: search || undefined,
    }),
    [search],
  );

  return {
    search,
    page,
    pageSize: per_page,
    filters,
    setSearch,
    setPage,
    setPageSize,
    resetFilters,
    isAnyFilterActive,
  };
}

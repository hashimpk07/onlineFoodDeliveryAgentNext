// "use client";

import { useCallback, useMemo } from "react";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export function useTransactionParams() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [q, setSearchState] = useQueryState("q", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(DEFAULT_PAGE),
  );
  const [pageSize, setPageSize] = useQueryState(
    "per_page",
    parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  );

  const setSearch = useCallback(
    (value: string) => {
      setPage(DEFAULT_PAGE);
      setSearchState(value);
    },
    [setPage, setSearchState],
  );

  const filters = useMemo(
    () => ({
      q: q || undefined,
    }),
    [q],
  );

  return {
    q,
    page,
    pageSize,
    filters,
    setSearch,
    setPage,
    setPageSize,
  };
}

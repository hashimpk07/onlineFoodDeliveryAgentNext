"use client";

import { useCallback } from "react";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useNotificationsParams() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [{ page, per_page, search }, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    per_page: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
    search: parseAsString.withDefault(""),
  });

  const setPage = useCallback(
    (value: number) => setParams({ page: value }),
    [setParams],
  );

  const setPageSize = useCallback(
    (value: number) => setParams({ per_page: value, page: DEFAULT_PAGE }),
    [setParams],
  );

  const setSearch = useCallback(
    (value: string) => setParams({ search: value, page: DEFAULT_PAGE }),
    [setParams],
  );

  return {
    page,
    perPage: per_page,
    search,
    setPage,
    setPerPage: setPageSize,
    setSearch,
  };
}

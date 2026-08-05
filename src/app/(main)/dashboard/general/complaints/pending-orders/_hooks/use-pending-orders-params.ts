"use client";

import { useCallback, useMemo } from "react";

import { Options, parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function usePendingOrdersParams() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [params, setParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(DEFAULT_PAGE),
      per_page: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
      q: parseAsString.withDefault(""),
      zone: parseAsString.withDefault(""),
      fromDate: parseAsString.withDefault(""),
      toDate: parseAsString.withDefault(""),
      captain: parseAsString.withDefault(""),
      shop_name: parseAsString.withDefault(""),
    },
    {
      history: "push",
    },
  );

  const setPage = useCallback(
    (value: number, options?: Options) => setParams({ page: value }, options),
    [setParams],
  );

  const setZone = useCallback(
    (value: string | null, options?: Options) =>
      setParams(
        {
          zone: value,
          page: DEFAULT_PAGE,
        },
        options,
      ),
    [setParams],
  );

  const setFromDate = useCallback(
    (value: string | null, options?: Options) =>
      setParams(
        {
          fromDate: value,
          page: DEFAULT_PAGE,
        },
        options,
      ),
    [setParams],
  );

  const setToDate = useCallback(
    (value: string | null, options?: Options) =>
      setParams(
        {
          toDate: value,
          page: DEFAULT_PAGE,
        },
        options,
      ),
    [setParams],
  );

  const setCaptain = useCallback(
    (value: string | null, options?: Options) =>
      setParams(
        {
          captain: value,
          page: DEFAULT_PAGE,
        },
        options,
      ),
    [setParams],
  );

  const setShopName = useCallback(
    (value: string | null, options?: Options) =>
      setParams(
        {
          shop_name: value,
          page: DEFAULT_PAGE,
        },
        options,
      ),
    [setParams],
  );

  const setPageSize = useCallback(
    (value: number, options?: Options) =>
      setParams(
        {
          per_page: value,
          page: DEFAULT_PAGE,
        },
        options,
      ),
    [setParams],
  );

  const setQ = useCallback(
    (
      value: string | ((old: string) => string | null) | null,
      options?: Options,
    ) => {
      const newValue = typeof value === "function" ? value(params.q) : value;

      return setParams(
        {
          q: newValue,
          page: DEFAULT_PAGE,
        },
        options,
      );
    },
    [setParams, params.q],
  );

  const resetFilters = useCallback(() => {
    setParams({
      zone: null,
      fromDate: null,
      toDate: null,
      captain: null,
      shop_name: null,
      q: null,
      page: DEFAULT_PAGE,
      per_page: DEFAULT_PAGE_SIZE,
    });
  }, [setParams]);

  const isAnyFilterActive = useMemo(() => {
    return Boolean(
      params.zone ||
      params.fromDate ||
      params.toDate ||
      params.captain ||
      params.shop_name ||
      params.q ||
      params.page !== DEFAULT_PAGE ||
      params.per_page !== DEFAULT_PAGE_SIZE,
    );
  }, [params, DEFAULT_PAGE, DEFAULT_PAGE_SIZE]);

  return {
    zone: params.zone,
    fromDate: params.fromDate,
    toDate: params.toDate,
    captain: params.captain,
    shop_name: params.shop_name,
    q: params.q,
    setZone,
    setFromDate,
    setToDate,
    setCaptain,
    setShopName,
    setQ,
    page: params.page,
    pageSize: params.per_page,
    setPage,
    setPageSize,
    resetFilters,
    isAnyFilterActive,
  };
}

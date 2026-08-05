import { useCallback } from "react";

import { parseAsInteger, useQueryStates } from "nuqs";

interface UsePaginationParamsOptions {
  prefix?: string;
  defaultPage?: number;
  defaultPageSize?: number;
  // nuqs options
  history?: "push" | "replace";
  shallow?: boolean;
  scroll?: boolean;
}

export function usePaginationParams({
  prefix = "",
  defaultPage = 1,
  defaultPageSize = 10,
  history = "push",
  shallow = false,
  scroll = false,
}: UsePaginationParamsOptions = {}) {
  const pageKey = prefix ? `${prefix}_page` : "page";
  const pageSizeKey = prefix ? `${prefix}_per_page` : "per_page";

  const [params, setParams] = useQueryStates(
    {
      [pageKey]: parseAsInteger.withDefault(defaultPage),
      [pageSizeKey]: parseAsInteger.withDefault(defaultPageSize),
    },
    {
      history,
      shallow,
      scroll,
    },
  );

  // eslint-disable-next-line security/detect-object-injection
  const page = params[pageKey];
  // eslint-disable-next-line security/detect-object-injection
  const pageSize = params[pageSizeKey];

  const setPage = useCallback(
    (newPage: number, options?: { history?: "push" | "replace" }) => {
      setParams(
        { [pageKey]: newPage },
        { history: options?.history ?? history },
      );
    },
    [pageKey, setParams, history],
  );

  const setPageSize = useCallback(
    (newPageSize: number, options?: { history?: "push" | "replace" }) => {
      setParams(
        {
          [pageSizeKey]: newPageSize,
          [pageKey]: 1,
        },
        { history: options?.history ?? history },
      );
    },
    [pageKey, pageSizeKey, setParams, history],
  );

  const resetPagination = useCallback(() => {
    setParams({
      [pageKey]: defaultPage,
      [pageSizeKey]: defaultPageSize,
    });
  }, [pageKey, pageSizeKey, defaultPage, defaultPageSize, setParams]);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    resetPagination,
  };
}

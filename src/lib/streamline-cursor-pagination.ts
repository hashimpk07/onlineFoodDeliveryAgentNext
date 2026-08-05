"use client";

import { useCallback, useState } from "react";

import {
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";

export type StreamlineCursorMeta = {
  path?: string;
  per_page?: number;
  next_cursor?: string | null;
  prev_cursor?: string | null;
};

export type StreamlinePaginatedResponse<T> = {
  data: T[];
  meta?: StreamlineCursorMeta;
};

type UseCursorPaginatedQueryOptions<T, F extends { cursor?: string | null }> = {
  queryKey: unknown[];
  queryFn: (filters: F) => Promise<StreamlinePaginatedResponse<T>>;
  filters: Omit<F, "cursor">;
  enabled?: boolean;
};

export type CursorPaginatedQueryResult<T> = {
  items: T[];
  hasNext: boolean;
  hasPrev: boolean;
  goNext: () => void;
  goPrev: () => void;
  resetCursor: () => void;
  refetchFromStart: () => Promise<void>;
} & Pick<
  UseQueryResult<StreamlinePaginatedResponse<T>>,
  "isLoading" | "isFetching" | "isError" | "refetch"
>;

export function useCursorPaginatedQuery<
  T,
  F extends { cursor?: string | null },
>({
  queryKey,
  queryFn,
  filters,
  enabled = true,
}: UseCursorPaginatedQueryOptions<T, F>): CursorPaginatedQueryResult<T> {
  const queryClient = useQueryClient();
  const [cursor, setCursor] = useState<string | null>(null);
  const queryKeySignature = JSON.stringify(queryKey);
  const [prevQueryKeySignature, setPrevQueryKeySignature] =
    useState(queryKeySignature);

  if (queryKeySignature !== prevQueryKeySignature) {
    setPrevQueryKeySignature(queryKeySignature);
    setCursor(null);
  }

  const query = useQuery({
    queryKey: [...queryKey, cursor],
    queryFn: () => queryFn({ ...filters, cursor } as F),
    enabled,
  });

  const meta = query.data?.meta;
  const hasNext = Boolean(meta?.next_cursor);
  const hasPrev = Boolean(meta?.prev_cursor);

  const goNext = useCallback(() => {
    if (meta?.next_cursor) setCursor(meta.next_cursor);
  }, [meta]);

  const goPrev = useCallback(() => {
    if (meta?.prev_cursor) setCursor(meta.prev_cursor);
  }, [meta]);

  const resetCursor = useCallback(() => setCursor(null), []);

  const refetchFromStart = useCallback(async () => {
    setCursor(null);
    await queryClient.fetchQuery({
      queryKey: [...queryKey, null],
      queryFn: () => queryFn({ ...filters, cursor: null } as F),
    });
  }, [filters, queryClient, queryFn, queryKey]);

  return {
    items: query.data?.data ?? [],
    hasNext,
    hasPrev,
    goNext,
    goPrev,
    resetCursor,
    refetchFromStart,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}

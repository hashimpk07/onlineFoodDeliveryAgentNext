/* eslint-disable no-console */
"use no memo";
import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

type UseDataTableInstanceProps<
  TData extends { id?: string | number },
  TValue,
> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  enableRowSelection?: boolean;
  manualPagination?: boolean;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  pageCount?: number;
  getRowId?: (row: TData, index: number) => string;
  manualSorting?: boolean;
  // FIX: accept a TanStack-compatible updater (not just plain SortingState)
  // so the URL-synced setSorting from use-params can be passed directly.
  onSortingChange?: (
    updater: SortingState | ((prev: SortingState) => SortingState),
  ) => void;
  // Optionally accept an initial/controlled sorting state from the caller
  sorting?: SortingState;
  autoResetRowSelection?: boolean;
};

export function useDataTableInstance<
  TData extends { id?: string | number },
  TValue,
>({
  data,
  columns,
  enableRowSelection = true,
  manualPagination = false,
  pagination,
  pageCount,
  getRowId,
  manualSorting = false,
  onSortingChange,
  sorting: externalSorting,
  autoResetRowSelection,
}: UseDataTableInstanceProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  // FIX: use internal state only when no external sorting is provided
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(
    [],
  );
  const sorting = externalSorting ?? internalSorting;

  // FIX: handleSortingChange now correctly forwards the raw updater to both
  // the internal state and the external onSortingChange callback.
  // Previously it resolved the updater before passing it out, which broke
  // libraries (like nuqs) that expect to receive the updater directly.
  const handleSortingChange = React.useCallback(
    (updater: SortingState | ((prev: SortingState) => SortingState)) => {
      // Keep internal state in sync (needed even when externalSorting is used
      // so that toggling works correctly on the next click)
      setInternalSorting((prev) =>
        typeof updater === "function" ? updater(prev) : updater,
      );
      // Forward the raw updater so the caller can update URL params etc.
      onSortingChange?.(updater);
    },
    [onSortingChange],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      ...(manualPagination && pagination ? { pagination } : {}),
    },
    enableRowSelection,
    getRowId:
      getRowId ??
      ((row, index) => {
        const id = row.id;
        if (id == null) {
          return String(index);
        }
        return String(id);
      }),
    onRowSelectionChange: (updater) => {
      console.log(
        "onRowSelectionChange called in table hook, updater:",
        updater,
      );
      setRowSelection(updater);
    },
    autoResetRowSelection,
    // FIX: use handleSortingChange so the external callback is always called.
    // The original code used `setSorting` directly, which never triggered
    // onSortingChange and therefore never updated the URL / re-fetched data.
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination,
    manualSorting,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // FIX: removed the duplicate `getSortedRowModel` spread that was
    // unconditionally overwriting the one set just two lines above.
    // Now getSortedRowModel is only registered for client-side sorting.
    ...(!manualSorting ? { getSortedRowModel: getSortedRowModel() } : {}),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return table;
}

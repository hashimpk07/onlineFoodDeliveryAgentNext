"use client";

import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchableSelect } from "@/components/ui/searchable-select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalCount: number;
  page?: number;
  pageSize?: number;
  setPage?: (page: number, options?: any) => void;
  setPageSize?: (pageSize: number, options?: any) => void;
}

export function DataTablePagination<TData>({
  table,
  totalCount,
  page,
  pageSize,
  setPage,
  setPageSize,
}: DataTablePaginationProps<TData>) {
  const tableState = table.getState().pagination;

  const resolvedPage = page ?? tableState.pageIndex + 1;
  const resolvedPageSize = pageSize ?? tableState.pageSize;

  const safeTotal = Number.isFinite(totalCount) ? totalCount : 0;
  const safePageSize =
    Number.isFinite(resolvedPageSize) && resolvedPageSize > 0
      ? resolvedPageSize
      : 20;
  const safePage =
    Number.isFinite(resolvedPage) && resolvedPage > 0 ? resolvedPage : 1;

  const pageIndex = safePage - 1;
  const pageCount = Math.ceil(safeTotal / safePageSize);

  const from = safeTotal === 0 ? 0 : pageIndex * safePageSize + 1;
  const to =
    safeTotal === 0 ? 0 : Math.min((pageIndex + 1) * safePageSize, safeTotal);

  const handlePageChange = (newPage: number) => {
    if (setPage) {
      setPage(newPage, { history: "push" });
    } else {
      table.setPageIndex(newPage - 1);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    if (setPage && setPageSize) {
      setPage(1, { history: "push" });
      setPageSize(newSize, { history: "push" });
    } else {
      table.setPageIndex(0);
      table.setPageSize(newSize);
    }
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
      <div className="text-center md:text-left">
        Showing <span className="font-medium">{from}</span> to{" "}
        <span className="font-medium">{to}</span> of{" "}
        <span className="font-medium">{safeTotal}</span> entries
      </div>

      <div className="flex items-center justify-center gap-2">
        <span className="hidden sm:inline">Rows per page</span>
        <span className="sm:hidden">Rows</span>
        <SearchableSelect
          label=""
          value={`${safePageSize}`}
          placeholder=""
          options={[10, 20, 40, 50, 75, 100].map((size) => ({
            id: `${size}`,
            label: `${size}`,
          }))}
          onChange={(value) => {
            handlePageSizeChange(Number(value));
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
        <span className="text-center">
          Page <span className="font-medium">{safePage}</span> of{" "}
          <span className="font-medium">{pageCount}</span>
        </span>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => handlePageChange(safePage - 1)}
            disabled={safePage <= 1}
          >
            <ChevronLeft />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => handlePageChange(safePage + 1)}
            disabled={safePage >= pageCount}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

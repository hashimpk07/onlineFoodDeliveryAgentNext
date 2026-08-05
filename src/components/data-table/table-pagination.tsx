/* eslint-disable */

"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchableSelect } from "@/components/ui/searchable-select";

interface DataTablePaginationProps<TData> {
  totalCount: number;
  // Pagination state
  page: number;
  pageSize: number;
  // Callbacks for state changes
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  // Optional customization
  pageSizeOptions?: number[];
  showRowsPerPage?: boolean;
  showPageInfo?: boolean;
  showNavigation?: boolean;
}

export function TablePagination<TData>({
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 40, 50],
  showRowsPerPage = true,
  showPageInfo = true,
  showNavigation = true,
}: DataTablePaginationProps<TData>) {
  const safeTotal = Number.isFinite(totalCount) ? totalCount : 0;
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 1;
  const pageIndex = page - 1;
  const pageCount = Math.ceil(safeTotal / safePageSize);
  const from = safeTotal === 0 ? 0 : pageIndex * safePageSize + 1;
  const to =
    safeTotal === 0 ? 0 : Math.min((pageIndex + 1) * safePageSize, safeTotal);

  const handlePageSizeChange = (value: string) => {
    onPageChange(1); // Reset to first page when changing page size
    onPageSizeChange(Number(value));
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
      {/* LEFT - Entry count */}
      {showPageInfo && (
        <div className="text-center md:text-left">
          Showing <span className="font-medium">{from}</span> to{" "}
          <span className="font-medium">{to}</span> of{" "}
          <span className="font-medium">{totalCount}</span> entries
        </div>
      )}

      {/* CENTER - Rows per page */}
      {showRowsPerPage && (
        <div className="flex items-center justify-center gap-2">
          <span className="hidden sm:inline">Rows per page</span>
          <span className="sm:hidden">Rows</span>
          <SearchableSelect
            label=""
            value={`${pageSize}`}
            placeholder=""
            options={pageSizeOptions.map((size) => ({
              id: `${size}`,
              label: `${size}`,
            }))}
            onChange={handlePageSizeChange}
          />
        </div>
      )}

      {/* RIGHT - Navigation */}
      {showNavigation && (
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <span className="text-center">
            Page <span className="font-medium">{page}</span> of{" "}
            <span className="font-medium">{pageCount}</span>
          </span>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
            >
              <ChevronLeft />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= pageCount}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

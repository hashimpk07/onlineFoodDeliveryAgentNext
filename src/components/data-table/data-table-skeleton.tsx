import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* eslint-disable complexity */
export function DataTableSkeleton({
  columnCount = 1,
  rowCount = 10,
  searchableColumnCount = 0,
  filterableColumnCount = 0,
  showViewOptions = false,
}) {
  return (
    <div className="flex flex-1 flex-col space-y-4 overflow-auto">
      {/* Filters/Search skeleton */}
      {searchableColumnCount > 0 || filterableColumnCount > 0 ? (
        <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
          <div className="flex flex-1 items-center space-x-2">
            {searchableColumnCount > 0
              ? Array.from({ length: searchableColumnCount }).map((_, i) => (
                  <Skeleton
                    key={`search-skeleton-${i}`}
                    className="h-10 w-[150px] lg:w-[250px]"
                  />
                ))
              : null}
            {filterableColumnCount > 0
              ? Array.from({ length: filterableColumnCount }).map((_, i) => (
                  <Skeleton
                    key={`filter-skeleton-${i}`}
                    className="h-10 w-[120px] border-dashed"
                  />
                ))
              : null}
          </div>
          {showViewOptions ? (
            <Skeleton className="ml-auto hidden h-10 w-[100px] lg:flex" />
          ) : null}
        </div>
      ) : null}

      {/* Table skeleton */}
      <div className="relative rounded-md border h-[500px] overflow-hidden">
        <div className="flex h-full">
          <ScrollArea className="flex flex-1">
            <Table>
              <TableHeader>
                {Array.from({ length: 1 }).map((_, i) => (
                  <TableRow
                    key={`header-row-skeleton-${i}`}
                    className="hover:bg-transparent"
                  >
                    {Array.from({ length: columnCount }).map((_, colIndex) => (
                      <TableHead key={`header-cell-skeleton-${colIndex}`}>
                        <Skeleton
                          className={`h-6 ${
                            colIndex === 0
                              ? "w-16" // ID column
                              : colIndex === 1
                                ? "w-20" // Order ID
                                : colIndex === 2
                                  ? "w-24" // Client Name
                                  : colIndex === 3
                                    ? "w-20" // Shop Name
                                    : colIndex === 4
                                      ? "w-16" // Area
                                      : colIndex === 5
                                        ? "w-16" // Zone
                                        : colIndex === 6
                                          ? "w-20" // Amount
                                          : colIndex === 7
                                            ? "w-16" // Type
                                            : colIndex === 8
                                              ? "w-20" // Status
                                              : colIndex === 9
                                                ? "w-24" // Captain
                                                : colIndex === 10
                                                  ? "w-20" // Updated At
                                                  : colIndex === 11
                                                    ? "w-16" // Actions
                                                    : "w-full"
                          }`}
                        />
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {Array.from({ length: rowCount }).map((_, rowIndex) => (
                  <TableRow
                    key={`body-row-skeleton-${rowIndex}`}
                    className="hover:bg-transparent"
                  >
                    {Array.from({ length: columnCount }).map((_, colIndex) => (
                      <TableCell key={`body-cell-skeleton-${colIndex}`}>
                        <Skeleton
                          className={`h-6 ${
                            colIndex === 0
                              ? "w-12" // ID column
                              : colIndex === 1
                                ? "w-16" // Order ID
                                : colIndex === 2
                                  ? "w-20" // Client Name
                                  : colIndex === 3
                                    ? "w-18" // Shop Name
                                    : colIndex === 4
                                      ? "w-14" // Area
                                      : colIndex === 5
                                        ? "w-14" // Zone
                                        : colIndex === 6
                                          ? "w-16" // Amount
                                          : colIndex === 7
                                            ? "w-12" // Type badge
                                            : colIndex === 8
                                              ? "w-16" // Status badge
                                              : colIndex === 9
                                                ? "w-20" // Captain
                                                : colIndex === 10
                                                  ? "w-18" // Updated At
                                                  : colIndex === 11
                                                    ? "w-8" // Actions
                                                    : "w-full"
                          }`}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
        <div className="flex-1">
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-[70px]" />
          </div>
          <div className="hidden w-[100px] items-center justify-center text-sm font-medium md:flex">
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="hidden items-center space-x-2 md:flex">
            <Skeleton className="hidden size-8 lg:block" />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="hidden size-8 lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
}

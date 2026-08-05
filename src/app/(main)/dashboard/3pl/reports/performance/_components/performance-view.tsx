"use client";
"use no memo";

import { useMemo } from "react";

import { SortingState, Updater } from "@tanstack/react-table";

import { FilterPanel } from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_components/filter-panel";
import { createCaptainTransactionColumns } from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_components/table-column";
import { useCaptainPerformanceParams } from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_hooks/use-params";
import { useCaptainPerformanceList } from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_hooks/use-performance-list";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

export const PerformanceTable = () => {
  const columns = useMemo(() => createCaptainTransactionColumns(), []);

  const { page, pageSize, sorting, setSorting, setPage } =
    useCaptainPerformanceParams();

  const { capatian_transaction, isLoading, isError, error, pagination } =
    useCaptainPerformanceList();

  const handleSortChange = (updater: Updater<SortingState>) => {
    setSorting(updater);
    setPage(1);
  };

  const table = useDataTableInstance({
    data: capatian_transaction ?? [],
    columns,
    manualPagination: true,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
    pageCount: Math.ceil((pagination?.total ?? 0) / pageSize),
    manualSorting: true,
    sorting,
    onSortingChange: handleSortChange,
  });

  if (isLoading) {
    return (
      <DataTableSkeleton
        columnCount={12}
        rowCount={10}
        searchableColumnCount={3}
        filterableColumnCount={6}
        showViewOptions={false}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <FilterPanel table={table} />

      <div className="flex-1 rounded-md border relative bg-card shadow-sm w-full min-w-0 overflow-hidden">
        <DataTable table={table} columns={columns} />
        <DataTablePagination
          table={table}
          totalCount={pagination?.total ?? 0}
        />
      </div>
    </div>
  );
};

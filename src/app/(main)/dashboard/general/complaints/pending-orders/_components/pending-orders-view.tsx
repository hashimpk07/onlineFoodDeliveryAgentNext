/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import ErrorDisplay from "@/components/ui/error-display";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import usePendingOrdersList from "../_hooks/use-pending-orders";
import { usePendingOrdersParams } from "../_hooks/use-pending-orders-params";
import { PendingOrders } from "../_types";

import { pendingOrdersColumns } from "./pending-orders-columns";
import { PendingOrdersFilter } from "./pending-orders-filter";

export default function PendingOrdersView() {
  const columns = useMemo(() => pendingOrdersColumns(), []);

  const { data, pagination, isLoading, error } = usePendingOrdersList();

  const { page, pageSize, setPage, setPageSize } = usePendingOrdersParams();

  const table = useDataTableInstance({
    data: data ?? [],
    columns,
    pageCount: Math.max(1, pagination?.last_page ?? 1),
    manualPagination: true,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
    getRowId: (row: PendingOrders, index) => `${row.id}-${index}`,
  });

  if (error) {
    return (
      <ErrorDisplay
        title="Failed to load pending orders"
        message={error.message || "Unknown error"}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <PendingOrdersFilter />
        <DataTableSkeleton
          columnCount={5}
          rowCount={10}
          searchableColumnCount={0}
          filterableColumnCount={0}
          showViewOptions={false}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <PendingOrdersFilter />
      <div className="flex-1 rounded-md border relative bg-card shadow-sm w-full min-w-0 overflow-hidden">
        <DataTable table={table} columns={columns} />

        <DataTablePagination
          table={table}
          totalCount={pagination?.total ?? 0}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}

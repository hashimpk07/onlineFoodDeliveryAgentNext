/* eslint-disable @typescript-eslint/no-unnecessary-condition */

"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { useReconciliationList } from "../_hooks/use-reconciliation-list";

import { columns } from "./reconciliation-column";
import { ReconciliationFilters } from "./reconciliation-filters";
import { ReconciliationTable } from "./reconciliation-table";

export default function ReconciliationView() {
  const { commissions, pagination, loading } = useReconciliationList();

  const table = useDataTableInstance({
    data: commissions ?? [],
    columns,
    pageCount: pagination?.total ?? 1,
    manualPagination: true,
    // getRowId: (row) => String(row.id),
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <ReconciliationFilters loading={loading} />
        <DataTableSkeleton
          columnCount={columns.length}
          rowCount={10}
          searchableColumnCount={1}
          showViewOptions={false}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5 mt-2">
      <div className="flex flex-col gap-4 w-full min-w-0">
        <ReconciliationFilters loading={false} table={table} />
        <ReconciliationTable
          table={table}
          isLoading={loading}
          total={pagination?.total ?? 0}
        />
      </div>
    </div>
  );
}

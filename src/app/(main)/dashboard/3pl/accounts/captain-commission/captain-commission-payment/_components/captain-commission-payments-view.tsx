/* eslint-disable @typescript-eslint/no-unnecessary-condition */

"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { useCaptainCommissionPaymentList } from "../_hooks/use-captain-commission-payments-list";

import { columns } from "./captain-commission-payments-column";
import { CaptainCommissionPaymentFilters } from "./captain-commission-payments-filters";
import { CaptainCommissionPaymentTable } from "./captain-commission-payments-table";

export default function CaptainCommissionPaymentView() {
  const { commissions, pagination, loading } =
    useCaptainCommissionPaymentList();

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
        <CaptainCommissionPaymentFilters loading={loading} />
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
        <CaptainCommissionPaymentFilters loading={false} table={table} />
        <CaptainCommissionPaymentTable
          table={table}
          isLoading={loading}
          total={pagination?.total ?? 0}
        />
      </div>
    </div>
  );
}

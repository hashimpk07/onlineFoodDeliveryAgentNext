"use client";
"use no memo";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { useOrdersLists } from "../_hooks/use-order-report-list";

import { columns } from "./order-report-column";
import { OrderReportFilters } from "./order-report-filters";
import { OrderReportTable } from "./order-report-table";

export default function OrderReportView() {
  const {
    order,
    pagination,
    loading,
    captains,
    statuses,
    isLoading,
    page,
    pageSize,
    setPage,
    setPageSize,
  } = useOrdersLists();
  const table = useDataTableInstance({
    data: order ?? [],
    columns,
    pageCount: pagination?.total_pages ?? 1,
    manualPagination: true,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <OrderReportFilters
          captains={captains}
          statuses={statuses}
          loading={loading}
        />
        <DataTableSkeleton
          columnCount={8}
          rowCount={10}
          showViewOptions={false}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      <OrderReportFilters
        captains={captains}
        statuses={statuses}
        loading={loading}
        table={table}
      />
      <OrderReportTable
        table={table}
        isLoading={loading}
        total={pagination?.total ?? 0}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </div>
  );
}

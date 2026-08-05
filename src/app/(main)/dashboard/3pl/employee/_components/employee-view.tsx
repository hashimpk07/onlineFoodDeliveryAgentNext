"use client";
"use no memo";

import { EmployeeFilters } from "@/app/[locale]/(main)/dashboard/3pl/employee/_components/employee-filters";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { useEmployeeLists } from "../_hooks/use-employee-list";

import { columns } from "./employee-column";
import { EmployeeTable } from "./employee-table";

export default function EmployeeView() {
  const {
    order,
    pagination,
    loading,
    isLoading,
    page,
    pageSize,
    setPage,
    setPageSize,
  } = useEmployeeLists();

  const table = useDataTableInstance({
    data: order ?? [],
    columns,
    pageCount: pagination?.total ?? 1,
    manualPagination: true,
  });
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <EmployeeFilters loading={loading} />
        <DataTableSkeleton
          columnCount={4}
          rowCount={10}
          searchableColumnCount={1}
          showViewOptions={false}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      <EmployeeFilters loading={false} table={table} />
      <EmployeeTable
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

"use client";

import { useCaptainWorkingDaysTableCoulmns } from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_components/table-columns";
import { useWorkingDaysParams } from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_hooks/use-params";
import { useWorkingDaysList } from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_hooks/use-working-days";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DynamicHeaderTable } from "@/components/data-table/dynamic-header-table";
import { TablePagination } from "@/components/data-table/table-pagination";

export function WorkingDaysTable() {
  const { reports, isLoading, pagination } = useWorkingDaysList();

  const { page, pageSize, setPage, setPageSize } = useWorkingDaysParams();

  const { columns, dynamicHeaderConfig } = useCaptainWorkingDaysTableCoulmns({
    reports,
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
    <div className="space-y-4">
      <DynamicHeaderTable
        columns={columns}
        data={reports}
        dynamicHeaderConfig={dynamicHeaderConfig}
        enablePagination={true}
        pageSize={pageSize}
      />

      <TablePagination
        totalCount={pagination?.total ?? 0}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}

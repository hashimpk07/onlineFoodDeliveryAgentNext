"use client";
"use no memo";

import { useCallback, useMemo } from "react";

import { useRouter } from "next/navigation";

import { CaptainFilterPanel } from "@/app/[locale]/(main)/dashboard/3pl/captain/_components/captain-filters";
import { createCaptainColumns } from "@/app/[locale]/(main)/dashboard/3pl/captain/_components/table-column";
import { useCaptainList } from "@/app/[locale]/(main)/dashboard/3pl/captain/_hooks/use-captain-list";
import { useCaptainUrlParams } from "@/app/[locale]/(main)/dashboard/3pl/captain/_hooks/use-captain-params";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

export default function CaptainViewPage() {
  // ALL HOOKS MUST BE CALLED FIRST, BEFORE ANY CONDITIONAL RETURNS
  const { page, pageSize } = useCaptainUrlParams();
  const router = useRouter();

  const { captains, isLoading, isError, error, pagination } = useCaptainList();

  const handleView = useCallback(
    (id: string | number) => {
      router.push(`/dashboard/3pl/captain/view/${id}`);
    },
    [router],
  );

  const handleEdit = useCallback(
    (id: string | number) => {
      router.push(`/dashboard/3pl/captain/${id}`);
    },
    [router],
  );

  const columns = useMemo(
    () => createCaptainColumns(handleView, handleEdit),
    [handleView, handleEdit],
  );

  const table = useDataTableInstance({
    data: captains ?? [],
    columns,
    manualPagination: true,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
    pageCount: Math.ceil((pagination?.total ?? 0) / pageSize),
  });

  // NOW you can have conditional rendering AFTER all hooks
  if (isLoading) {
    return (
      <>
        <CaptainFilterPanel />
        <DataTableSkeleton
          columnCount={12}
          rowCount={10}
          searchableColumnCount={3}
          filterableColumnCount={6}
          showViewOptions={false}
        />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <CaptainFilterPanel />
        <div className="p-4 text-red-500">
          Failed to load captains
          <div className="text-sm mt-1">
            {error instanceof Error ? error.message : "Unknown error"}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <CaptainFilterPanel table={table} />

      <div className="flex-1 rounded-md border relative bg-card shadow-sm w-full min-w-0 overflow-hidden">
        <DataTable table={table} columns={columns} />
        <DataTablePagination
          table={table}
          totalCount={pagination?.total ?? 0}
          page={page}
          pageSize={pageSize}
          setPage={function (page: number, options?: any): void {
            throw new Error("Function not implemented.");
          }}
          setPageSize={function (pageSize: number, options?: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </div>
  );
}

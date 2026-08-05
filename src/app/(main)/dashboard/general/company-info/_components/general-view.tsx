"use client";

import { useMemo } from "react";

import { useOrdersUrlParams } from "@/app/[locale]/(main)/dashboard/3pl/order/_hooks/use-orders-parms";
import {
  createCompanyInfoColumns,
  CompanyInfoItem,
} from "@/app/[locale]/(main)/dashboard/general/company-info/_components/columns";
import useCompanyInfoList from "@/app/[locale]/(main)/dashboard/general/company-info/_hooks/use-company-info";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

function getTableData(data: unknown) {
  const safeData = data as Record<string, unknown> | null | undefined;
  const responseData = (safeData?.data ?? safeData ?? {}) as Record<
    string,
    unknown
  >;

  const companiesList = (responseData.companies ??
    responseData.data ??
    []) as CompanyInfoItem[];
  const pagination = (responseData.pagination ?? {}) as Record<
    string,
    number | undefined
  >;

  return {
    companiesList,
    pageCount: pagination.last_page ?? 1,
    totalCount: pagination.total ?? 0,
  };
}

export default function CompanyInfoView() {
  const columns = useMemo(() => createCompanyInfoColumns(), []);

  const { data, isLoading } = useCompanyInfoList();
  const { page, pageSize, setPage, setPageSize } = useOrdersUrlParams();

  const { companiesList, pageCount, totalCount } = useMemo(
    () => getTableData(data),
    [data],
  );

  const table = useDataTableInstance({
    data: companiesList,
    columns,
    pageCount,
    manualPagination: true,
    getRowId: (row, index) =>
      `${String((row as { id?: string | number }).id)}-${index}`,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <DataTableSkeleton
          columnCount={3}
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
      <div className="flex-1 rounded-md border relative bg-card shadow-sm w-full min-w-0 overflow-hidden">
        <DataTable table={table} columns={columns} />
        <DataTablePagination
          table={table}
          totalCount={totalCount}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}

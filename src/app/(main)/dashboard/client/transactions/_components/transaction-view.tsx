"use client";

import { useTransactionLists } from "@/app/[locale]/(main)/dashboard/client/transactions/_hooks/use-transaction-lists";
import { useTransactionParams } from "@/app/[locale]/(main)/dashboard/client/transactions/_hooks/use-transaction-params";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { columns } from "./transactions-table/columns";
import { TransactionReportFilters } from "./transactions-table/transactions-filters";

export default function TransactionView() {
  const { q, setSearch, page, pageSize, setPage, setPageSize } =
    useTransactionParams();

  const { transactions, pagination, loading } = useTransactionLists();

  const table = useDataTableInstance({
    data: transactions,
    columns,
    manualPagination: true,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
    pageCount: Math.ceil((pagination?.total ?? 0) / pageSize),
  });

  if (loading) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-4">
        <TransactionReportFilters
          loading={loading}
          searchQuery={q}
          setSearchQuery={setSearch}
        />
        <DataTableSkeleton
          columnCount={columns.length}
          rowCount={pageSize}
          searchableColumnCount={1}
          showViewOptions={false}
        />
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      {/* Filter component */}
      <TransactionReportFilters
        loading={loading}
        searchQuery={q}
        setSearchQuery={setSearch}
      />

      {/* Table */}
      <div className="flex-1 rounded-md border relative bg-card shadow-sm w-full min-w-0 overflow-hidden">
        <DataTable table={table} columns={columns} />

        {/* Pagination */}
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

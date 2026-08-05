/* eslint-disable complexity */
"use client";

import { Truck, Calculator, Coins, HandCoins, Wallet } from "lucide-react";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { useCommissionReportList } from "../_hooks/use-commission-reports-list";
import { useCommissionReportParams } from "../_hooks/use-commission-reports-params";

import { CommissionReportsCard } from "./commission-reports-cards";
import { columns } from "./commission-reports-column";
import { CommissionReportsFilters } from "./commission-reports-filters";
import { CommissionReportsTable } from "./commission-reports-table";

export default function CommissionReportsView() {
  const { reports, pagination, loading, counts, isRefetching, page, pageSize } =
    useCommissionReportList();

  const { setPage, setPageSize } = useCommissionReportParams();

  const table = useDataTableInstance({
    data: reports,
    columns: columns,
    pageCount: pagination?.last_page ?? 1,
    manualPagination: true,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
    getRowId: (row, index) => (row.sn ? String(row.sn) : String(index)),
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
        <CommissionReportsFilters />
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
    <div className="space-y-4">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <CommissionReportsCard
          title="TOTAL ORDERS"
          count={counts?.attended_orders ?? 0}
          icon={<Truck className="h-10 w-10 text-red-500" />}
        />
        <CommissionReportsCard
          title="AVRG COMMISSION/ORDER"
          count={counts?.total_avg_commission ?? "0.00"}
          icon={<Calculator className="h-10 w-10 text-blue-500" />}
        />
        <CommissionReportsCard
          title="TOTAL COMMISSION"
          count={counts?.total_commission ?? "0.00"}
          icon={<Coins className="h-10 w-10 text-green-500" />}
        />
        <CommissionReportsCard
          title="PAID COMMISSION"
          count={counts?.total_payed_amount ?? "0.00"}
          icon={<HandCoins className="h-10 w-10 text-teal-500" />}
        />
        <CommissionReportsCard
          title="PAYABLE COMMISSION"
          count={counts?.total_payable_commission ?? "0.00"}
          icon={<Wallet className="h-10 w-10 text-yellow-500" />}
        />
      </div>
      <div className="space-y-4">
        {/* FILTER */}
        <CommissionReportsFilters />

        {/* TABLE */}
        <CommissionReportsTable
          table={table}
          isLoading={isRefetching}
          total={pagination?.total ?? 0}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}

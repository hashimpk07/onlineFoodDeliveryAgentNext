/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable complexity */
"use client";

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { useCaptainCommissionList } from "../_hooks/use-captain-commission-list";
import { useCaptainCommissionParams } from "../_hooks/use-captain-commission-params";

import { CaptainCommissionCard } from "./captain-commission-cards";
import { columns } from "./captain-commission-column";
import { CaptainCommissionFilters } from "./captain-commission-filters";
import { CaptainCommissionTable } from "./captain-commission-table";

export default function CaptainCommissionView() {
  const {
    capatian_commission,
    pagination,
    loading,
    counts,
    isRefetching,
    page,
    pageSize,
  } = useCaptainCommissionList();

  const { setPage, setPageSize } = useCaptainCommissionParams();

  // const table = useDataTableInstance({
  //   data: capatian_commission,
  //   columns: columns,
  //   keepPreviousData: false,
  //   pageCount: Math.max(1, pagination?.last_page ?? 1),
  //   manualPagination: true,
  //   pagination: {
  //     pageIndex: page - 1,
  //     pageSize,
  //   },
  //   getRowId: (row, index) => `${row.id ? String(row.id) : String(index)}`,
  // });

  const table = useDataTableInstance({
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    data: capatian_commission ?? [],
    columns,
    manualPagination: true,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
    getRowId: (row, index) => `${row.id ? String(row.id) : String(index)}`,
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
        <CaptainCommissionFilters loading />
        <DataTableSkeleton
          columnCount={columns.length}
          rowCount={10}
          searchableColumnCount={1}
          showViewOptions={false}
        />
      </div>
    );
  }

  const derivedTotalPayable = capatian_commission.reduce((acc, cur) => {
    const val = parseFloat(cur.payable_commission);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
  const displayTotalPayable =
    counts?.total_payable && parseFloat(counts.total_payable) !== 0
      ? counts.total_payable
      : derivedTotalPayable.toFixed(2);

  return (
    <>
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <CaptainCommissionCard
          title="ATTENDED ORDERS"
          count={counts?.total_attended_orders ?? 0}
        />
        <CaptainCommissionCard
          title="AVERAGE COMMISSION / ORDER"
          count={counts?.average_commission ?? "0.00"}
        />
        <CaptainCommissionCard
          title="TOTAL COMMISSION"
          count={counts?.total_commission ?? "0.00"}
        />
        <CaptainCommissionCard
          title="PAID COMMISSION"
          count={counts?.total_paid_commission ?? "0.00"}
        />
        <CaptainCommissionCard
          title="PAYABLE COMMISSION"
          count={displayTotalPayable}
        />
      </div>
      <div className="space-y-3">
        {/* FILTER + TABLE */}
        <CaptainCommissionFilters table={table} />

        <CaptainCommissionTable
          table={table}
          isLoading={loading}
          total={pagination?.total ?? 0}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </div>
    </>
  );
}

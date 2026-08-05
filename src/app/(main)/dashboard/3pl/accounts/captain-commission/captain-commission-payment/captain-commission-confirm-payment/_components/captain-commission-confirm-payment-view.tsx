/* eslint-disable security/detect-object-injection */
/* eslint-disable complexity */
"use client";

import { useEffect, useState } from "react";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useCaptainCommissionConfirmPaymentList } from "../_hooks/use-captain-commission-confirm-payment-list";
import { useCaptainCommissionDetailsParams } from "../_hooks/use-captain-commission-confirm-payment-params";

import { CaptainCommissionPaymentConfirmCard } from "./captain-commission-confirm-payment-cards";
import { columns } from "./captain-commission-confirm-payment-column";
import { CaptainCommissionDetailsFilters } from "./captain-commission-confirm-payment-filters";

import type { CaptainCommissionPayment } from "../_types/captain-commission-confirm-payment-type";

export default function CaptainCommissionConfirmPaymentView() {
  const {
    captains: initialCaptains,
    pagination,
    counts,
    loading,
    refetch,
    page,
    pageSize,
  } = useCaptainCommissionConfirmPaymentList();

  const [data, setData] = useState<CaptainCommissionPayment[]>([]);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    if (initialCaptains.length > 0) {
      setData(initialCaptains);
    }
  }, [initialCaptains]);

  const { setPage, setPageSize } = useCaptainCommissionDetailsParams();

  const table = useReactTable({
    data,
    columns: columns as any,
    pageCount: pagination?.last_page ?? 1,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getRowId: (row, index) => `${(row as any).captain_id}-${index}`,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );

        // If paying_amount is updated to zero or less, uncheck the row
        if (columnId === "paying_amount" && Number(value ?? 0) <= 0) {
          const row = data[rowIndex];
          const rowId = `${(row as any).captain_id ?? (row as any).id ?? rowIndex}`;

          setRowSelection((prev) => {
            const newSelection = { ...prev } as Record<string, boolean>;
            delete newSelection[rowId];
            return newSelection;
          });
        }
      },
    },
  });

  if (loading && data.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
        <CaptainCommissionDetailsFilters loading />
        <DataTableSkeleton
          columnCount={columns.length}
          rowCount={10}
          searchableColumnCount={0}
          showViewOptions={false}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CaptainCommissionPaymentConfirmCard
          title="Captains Count"
          imageSrc="/accounts/captains-commission/captain-count.png"
          count={counts?.captains_count ?? 0}
        />
        <CaptainCommissionPaymentConfirmCard
          title="Attended Orders"
          imageSrc="/accounts/captains-commission/attended-orders.png"
          count={counts?.attended_orders ?? 0}
        />
        <CaptainCommissionPaymentConfirmCard
          title="Average Commission / Order"
          imageSrc="/accounts/captains-commission/paid-commission.png"
          count={counts?.total_avg_commission ?? "0.00"}
        />
        <CaptainCommissionPaymentConfirmCard
          title="Total Commission"
          imageSrc="/accounts/captains-commission/total-commission.png"
          count={counts?.total_payable_commission ?? "0.00"}
        />
      </div>

      {/* FILTERS */}
      <CaptainCommissionDetailsFilters
        table={table}
        tableData={data}
        onReset={refetch}
        counts={counts}
      />

      {/* TABLE */}
      <div className="relative rounded-md border bg-card shadow-sm w-full overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur">
            <span className="animate-pulse text-muted-foreground">
              Loading...
            </span>
          </div>
        )}

        <ScrollArea className="w-full">
          <DataTable table={table} columns={columns} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

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

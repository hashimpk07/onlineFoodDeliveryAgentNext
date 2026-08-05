"use client";

import { Table } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { columns } from "./captain-commission-confirm-payment-column";

import type { CaptainCommissionPayment } from "../_types/captain-commission-confirm-payment-type";

interface CaptainCommissionPaymentTableProps {
  table: Table<CaptainCommissionPayment>;
  isLoading?: boolean;
  total: number;
}

export function CaptainCommissionPaymentTable({
  table,
  isLoading,
  total,
}: CaptainCommissionPaymentTableProps) {
  return (
    <div className="relative rounded-md border bg-card shadow-sm w-full overflow-hidden">
      {isLoading && (
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

      <DataTablePagination table={table} totalCount={total} />
    </div>
  );
}

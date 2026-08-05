"use client";
"use no memo";

import { Table } from "@tanstack/react-table";

import { DataTableBdr } from "@/components/data-table/data-table-bdr";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Order } from "../_types/order-report-type";

import { columns } from "./order-report-column";

interface OrderReportTableProps {
  table: Table<Order>;
  total: number;
  page: number;
  pageSize: number;
  setPage: (page: number, options?: any) => void;
  setPageSize: (pageSize: number, options?: any) => void;
}

export function OrderReportTable({
  table,
  total,
  page,
  pageSize,
  setPage,
  setPageSize,
}: OrderReportTableProps) {
  return (
    <div className="flex-1 rounded-md border relative bg-card shadow-sm w-full min-w-0 overflow-hidden">
      <div className="flex justify-end px-3 py-2 border-b">
        <DataTableViewOptions table={table} />
      </div>
      <ScrollArea className="w-full">
        <DataTableBdr table={table} columns={columns} showViewOptions={false} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <DataTablePagination
        table={table}
        totalCount={total}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </div>
  );
}

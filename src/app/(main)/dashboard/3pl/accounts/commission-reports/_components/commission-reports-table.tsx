"use client";

import { Table } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { columns } from "./commission-reports-column";

import type { CommissionReport } from "../_types/commission-reports-type";

interface CommissionReportsTableProps {
  table: Table<CommissionReport>;
  isLoading?: boolean;
  total: number;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

export function CommissionReportsTable({
  table,
  isLoading,
  total,
  page,
  pageSize,
  setPage,
  setPageSize,
}: CommissionReportsTableProps) {
  return (
    <div className="relative rounded-md border bg-card shadow-sm w-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur">
          <span className="animate-pulse text-muted-foreground">
            Loading...
          </span>
        </div>
      )}

      <div className="flex justify-between items-center px-4 py-4 border-b bg-muted/50">
        <h2 className="text-sm font-semibold uppercase text-red-500">
          Commission Report
        </h2>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Export
        </button>
      </div>

      <ScrollArea className="w-full">
        <DataTable table={table} columns={columns} />
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

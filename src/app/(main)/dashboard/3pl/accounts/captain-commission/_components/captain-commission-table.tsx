"use client";

import { Table } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { columns } from "./captain-commission-column";

import type { CaptainCommission } from "../_types/captain-commission-type";

interface CaptainCommissionTableProps {
  table: Table<CaptainCommission>;
  isLoading?: boolean;
  total: number;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

export function CaptainCommissionTable({
  table,
  isLoading,
  total,
  page,
  pageSize,
  setPage,
  setPageSize,
}: CaptainCommissionTableProps) {
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

"use client";

"use no memo";

import { Table } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { CompanyEarningOrder } from "../_types/company-earning-type";

import { columns } from "./company-earning-column";

interface CompanyEarningTableProps {
  table: Table<CompanyEarningOrder>;
  isLoading?: boolean;
  total: number;
}

export function CompanyEarningTable({
  table,
  isLoading,
  total,
}: CompanyEarningTableProps) {
  return (
    <div className="flex-1 rounded-md border relative bg-card shadow-sm w-full min-w-0 overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
          <span className="text-muted-foreground animate-pulse">
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

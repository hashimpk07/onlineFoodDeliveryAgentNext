"use client";
"use no memo";

import { Table } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Employee } from "../_types/employee-type";

import { columns } from "./employee-column";

interface EmployeeTableProps {
  page: number;
  pageSize: number;
  table: Table<Employee>;
  isLoading?: boolean;
  total: number;
  setPage: (page: number, options?: any) => void;
  setPageSize: (pageSize: number, options?: any) => void;
}

export function EmployeeTable({
  page,
  pageSize,
  table,
  isLoading,
  total,
  setPage,
  setPageSize,
}: EmployeeTableProps) {
  return (
    <div className="flex-1 rounded-md border relative bg-card shadow-sm w-full min-w-0 overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
          <span className="text-muted-foreground animate-pulse">
            Loading reports...
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
        page={Number(page)}
        pageSize={Number(pageSize)}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </div>
  );
}

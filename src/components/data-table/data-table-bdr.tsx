"use no memo";
import {
  ColumnDef,
  flexRender,
  type Table as TanStackTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableProps<TData, TValue> {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  showViewOptions?: boolean;
}

function renderTableBody<TData, TValue>({
  table,
  columns,
}: {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
}) {
  if (!table.getRowModel().rows.length) {
    return (
      <TableRow className="border-b border-border last:border-b-0">
        <TableCell
          colSpan={columns.length}
          className="border-r border-border last:border-r-0 px-4 py-2"
        >
          No results.
        </TableCell>
      </TableRow>
    );
  }

  return table.getRowModel().rows.map((row) => (
    <TableRow key={row.id} className="border-b border-border last:border-b-0">
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className="border-r border-border last:border-r-0 px-4 py-2"
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));
}

export function DataTableBdr<TData, TValue>({
  table,
  columns,
  showViewOptions = true,
}: DataTableProps<TData, TValue>) {
  return (
    <>
      {showViewOptions && (
        <div className="flex justify-end px-3 py-2 border-b">
          <DataTableViewOptions table={table} />
        </div>
      )}
      <Table className="border border-border rounded-md overflow-hidden">
        <TableHeader className="bg-muted/60 sticky top-0 z-10 backdrop-blur-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-border hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="border-r border-border px-4 py-2 text-xs font-bold tracking-wide text-muted-foreground uppercase last:border-r-0"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>{renderTableBody({ table, columns })}</TableBody>
      </Table>
    </>
  );
}

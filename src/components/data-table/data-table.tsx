"use no memo";
import {
  ColumnDef,
  flexRender,
  type Table as TanStackTable,
} from "@tanstack/react-table";
import { motion } from "framer-motion";

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
  animateRows?: boolean;
}

function renderTableBody<TData, TValue>({
  table,
  columns,
  animateRows,
}: {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  animateRows: boolean;
}) {
  if (!table.getRowModel().rows.length) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );
  }

  return table.getRowModel().rows.map((row, index) => {
    const cells = row
      .getVisibleCells()
      .map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ));

    if (animateRows) {
      return (
        <motion.tr
          key={row.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
            ease: "easeOut",
          }}
          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
        >
          {cells}
        </motion.tr>
      );
    }

    return <TableRow key={row.id}>{cells}</TableRow>;
  });
}

export function DataTable<TData, TValue>({
  table,
  columns,
  showViewOptions = true,
  animateRows = true,
}: DataTableProps<TData, TValue>) {
  return (
    <>
      {showViewOptions && (
        <div className="flex justify-end px-3 py-2 border-b">
          <DataTableViewOptions table={table} />
        </div>
      )}
      <Table>
        <TableHeader className="bg-muted/60 sticky top-0 z-10 backdrop-blur-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-11 text-xs font-bold tracking-wide text-muted-foreground uppercase"
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

        <TableBody>
          {renderTableBody({
            table,
            columns,
            animateRows,
          })}
        </TableBody>
      </Table>
    </>
  );
}

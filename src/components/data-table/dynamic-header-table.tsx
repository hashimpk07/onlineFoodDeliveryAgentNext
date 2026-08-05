/* eslint-disable */

"use no memo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  type Table as TanStackTable,
} from "@tanstack/react-table";
import * as React from "react";

// Types for dynamic header groups
export interface HeaderGroup {
  label: string | React.ReactNode;
  colspan?: number;
  rowspan?: number;
  className?: string;
  id?: string; // Add optional id for better keys
}

export interface DynamicHeaderConfig {
  enableMultiHeader?: boolean;
  headerGroups?: HeaderGroup[][]; // Array of header rows
  headerClassName?: string;
}

interface DynamicHeaderTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  dynamicHeaderConfig?: DynamicHeaderConfig;
  onSortingChange?: (sorting: SortingState) => void;
  onFiltersChange?: (filters: ColumnFiltersState) => void;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  className?: string;
}

// Helper function to generate stable keys for header groups
function generateHeaderKey(
  rowIndex: number,
  cellIndex: number,
  header: HeaderGroup,
): string {
  if (header.id) {
    return header.id;
  }
  // Use label content as part of key if it's a string
  const labelKey =
    typeof header.label === "string"
      ? header.label.replace(/\s+/g, "-").toLowerCase()
      : "";
  return `header-${rowIndex}-${cellIndex}-${labelKey}`;
}

function DynamicHeaderTableInternal<TData, TValue>({
  columns,
  data,
  dynamicHeaderConfig,
  onSortingChange,
  onFiltersChange,
  enableSorting = false,
  enableFiltering = false,
  enablePagination = false,
  pageSize = 10,
  className,
}: DynamicHeaderTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  // eslint-disable-next-line react-compiler/react-compiler
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    onSortingChange: (updater) => {
      setSorting(updater);
      if (onSortingChange) {
        const newSorting =
          typeof updater === "function" ? updater(sorting) : updater;
        onSortingChange(newSorting);
      }
    },
    onColumnFiltersChange: (updater) => {
      setColumnFilters(updater);
      if (onFiltersChange) {
        const newFilters =
          typeof updater === "function" ? updater(columnFilters) : updater;
        onFiltersChange(newFilters);
      }
    },
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  return (
    <div className={cn("rounded-md border", className)}>
      <div className="relative overflow-auto">
        <Table>
          <TableHeader>
            {/* Render dynamic header groups if provided */}
            {dynamicHeaderConfig?.enableMultiHeader &&
            dynamicHeaderConfig.headerGroups ? (
              <>
                {dynamicHeaderConfig.headerGroups.map((headerRow, rowIndex) => (
                  <TableRow
                    key={`header-row-${rowIndex}`}
                    className={cn(dynamicHeaderConfig.headerClassName)}
                  >
                    {headerRow.map((header, cellIndex) => (
                      <TableHead
                        key={generateHeaderKey(rowIndex, cellIndex, header)}
                        colSpan={header.colspan}
                        rowSpan={header.rowspan}
                        className={cn(
                          "border-r font-bold text-center align-middle",
                          header.className,
                        )}
                      >
                        {header.label}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              /* Standard header rendering */
              table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))
            )}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-r">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Export as a generic component
export function DynamicHeaderTable<TData, TValue>(
  props: DynamicHeaderTableProps<TData, TValue>,
) {
  return <DynamicHeaderTableInternal {...props} />;
}

// Alternative: Export table instance for more control
interface DynamicHeaderTableWithInstanceProps<TData, TValue> {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData, TValue>[];
  dynamicHeaderConfig?: DynamicHeaderConfig;
  className?: string;
}

export function DynamicHeaderTableWithInstance<TData, TValue>({
  table,
  columns,
  dynamicHeaderConfig,
  className,
}: DynamicHeaderTableWithInstanceProps<TData, TValue>) {
  return (
    <div className={cn("rounded-md border", className)}>
      <div className="relative overflow-auto">
        <Table>
          <TableHeader>
            {dynamicHeaderConfig?.enableMultiHeader &&
            dynamicHeaderConfig.headerGroups ? (
              <>
                {dynamicHeaderConfig.headerGroups.map((headerRow, rowIndex) => (
                  <TableRow
                    key={`header-row-${rowIndex}`}
                    className={cn(dynamicHeaderConfig.headerClassName)}
                  >
                    {headerRow.map((header, cellIndex) => (
                      <TableHead
                        key={generateHeaderKey(rowIndex, cellIndex, header)}
                        colSpan={header.colspan}
                        rowSpan={header.rowspan}
                        className={cn(
                          "border-r font-bold text-center align-middle",
                          header.className,
                        )}
                      >
                        {header.label}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))
            )}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-r">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

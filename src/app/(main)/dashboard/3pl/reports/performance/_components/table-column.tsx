/* eslint-disable */
"use client";
"use no memo";

import { CaptainTransaction } from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_types/api";
import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

function SortableHeader<TData>({
  column,
  label,
}: {
  column: Column<TData, unknown>;
  label: string;
}) {
  const sorted = column.getIsSorted();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      {sorted === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : sorted === "desc" ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}

export const createCaptainTransactionColumns =
  (): ColumnDef<CaptainTransaction>[] => [
    {
      accessorKey: "captain_name",
      header: "Captain",
    },
    {
      accessorKey: "iqama_number",
      header: "Iqama No",
    },
    {
      accessorKey: "employee_id",
      header: "Employee Id",
    },
    {
      accessorKey: "employment_type",
      header: "Employee Type",
    },
    {
      accessorKey: "regions",
      header: "Region",
    },
    {
      accessorKey: "working_days",
      header: "Working Days",
    },
    {
      accessorKey: "productive_days",
      header: "Productive Days",
    },
    {
      accessorKey: "online_hours",
      header: "Online Hours",
    },
    {
      accessorKey: "avg_online_hours",
      header: "Avg. OH",
    },
    {
      accessorKey: "total_orders_received",
      header: "Received Orders",
    },
    {
      accessorKey: "orders_try_to_accept",
      header: "Try to Accept Orders",
    },
    {
      accessorKey: "total_orders_rejected",
      header: "Rejected Orders",
    },
    {
      accessorKey: "no_response_requests",
      header: "Expired Orders",
    },
    {
      accessorKey: "total_orders_accepted",
      header: "Accepted Orders",
    },
    {
      accessorKey: "acceptance_rate",
      header: ({ column }) => (
        <SortableHeader column={column} label="Acceptance Rate (%)" />
      ),
      cell: ({ getValue }) => `${getValue<number>()}%`,
      enableSorting: true,
    },
    {
      accessorKey: "total_orders_delivered",
      header: "Delivered Orders",
    },
    {
      accessorKey: "total_orders_returned",
      header: "Returned Orders",
    },
    {
      accessorKey: "total_orders_cancelled",
      header: "Canceled Orders",
    },
    {
      accessorKey: "success_rate",
      header: ({ column }) => (
        <SortableHeader column={column} label="Success Rate (%)" />
      ),
      cell: ({ getValue }) => `${getValue<number>()}%`,
      enableSorting: true,
    },
  ];

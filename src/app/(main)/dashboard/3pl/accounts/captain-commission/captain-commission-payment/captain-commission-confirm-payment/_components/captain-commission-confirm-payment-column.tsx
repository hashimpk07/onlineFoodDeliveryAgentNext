"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import type { CaptainCommissionPayment } from "../_types/captain-commission-confirm-payment-type";

export const columns: ColumnDef<CaptainCommissionPayment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        disabled={Number(row.original.paying_amount || 0) <= 0}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "captain_code",
    header: "Captain ID",
  },
  {
    accessorKey: "captain_name",
    header: "Captain Name",
  },
  {
    accessorKey: "working_region",
    header: "Working Region",
  },
  {
    accessorKey: "vehicle_type",
    header: "Vehicle Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "extra_km_earnings",
    header: "Extra Km Earning",
  },
  {
    accessorKey: "attended_orders",
    header: "Orders",
  },
  {
    accessorKey: "total_commission",
    header: "Total Commission",
  },
  {
    accessorKey: "total_earnings",
    header: "Total Earnings",
  },
  {
    accessorKey: "paying_amount",
    header: "Paying Amount",
    cell: ({ row, table }) => {
      const value = row.original.paying_amount;

      return (
        <input
          type="number"
          value={value ?? ""}
          className="w-24 border rounded px-2 py-1 bg-background text-foreground"
          onChange={(e) => {
            table.options.meta?.updateData?.(
              row.index,
              "paying_amount",
              e.target.value === "" ? 0 : Number(e.target.value),
            );
          }}
        />
      );
    },
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row, table }) => {
      const value = row.original.payment_method;

      return (
        <select
          value={value ?? ""}
          className="border rounded px-2 py-1 bg-background text-foreground"
          onChange={(e) => {
            table.options.meta?.updateData?.(
              row.index,
              "payment_method",
              e.target.value,
            );
          }}
        >
          <option value="">Select</option>
          <option value="Bank">Bank</option>
          <option value="Cash">Cash</option>
        </select>
      );
    },
  },
];

"use client";
"use no memo";

import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";

import { ShiftLog } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_types/api";
import { ShiftActionCallback } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_types/page";

export const createShiftColumns = (
  onAction: ShiftActionCallback,
): ColumnDef<ShiftLog>[] => [
  {
    accessorFn: (row) => row.vehicle.type,
    id: "vehicle_type",
    header: "Vehicle Type",
    cell: ({ getValue }) => getValue<string>() ?? "-",
  },
  {
    accessorFn: (row) => row.vehicle.number,
    id: "vehicle_number",
    header: "Vehicle Number",
    cell: ({ getValue }) => getValue<string>() ?? "-",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => getValue<string>() ?? "-",
  },
  {
    accessorKey: "start_time",
    header: "Shift Start",
    cell: ({ getValue }) => getValue<string>() ?? "-",
  },
  {
    accessorKey: "end_time",
    header: "Shift End",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value === "Active" ? (
        <span className="text-success font-medium">Active</span>
      ) : (
        (value ?? "-")
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Online Hours",
    cell: ({ getValue }) => getValue<string>() ?? "-",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <button
        onClick={() => onAction(row.original)}
        className="text-primary hover:underline cursor-pointer"
      >
        <Edit size={12} />
      </button>
    ),
  },
];

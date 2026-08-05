"use client";

import { ColumnDef } from "@tanstack/react-table";

import { VehicleActions } from "./vehicle-actions";

import type { Vehicle } from "../_types/vehicle-type";

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "code",
    header: "Vehicle Id",
  },
  {
    accessorKey: "type",
    header: "Vehicle Type",
  },
  {
    accessorKey: "veh_number",
    header: "Vehicle Number",
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    accessorKey: "assign",
    header: "Status",
  },
  {
    accessorKey: "captain",
    header: "Captain Name",
  },
  {
    accessorKey: "captain_type",
    header: "Captain Type",
  },
  {
    accessorKey: "current_km",
    header: "Current KM",
  },
  {
    accessorKey: "partner",
    header: "Owner",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <VehicleActions
        id={row.original.id}
        status={row.original.status as "Active" | "Inactive" | "Banned"}
        currentCaptain={row.original.captain}
      />
    ),
  },
];

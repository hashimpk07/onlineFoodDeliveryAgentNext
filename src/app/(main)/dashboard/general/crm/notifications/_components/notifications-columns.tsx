"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import { Notification } from "../_types";

export function createNotificationColumns(): ColumnDef<Notification>[] {
  return [
    {
      accessorKey: "title",
      header: "Title (Subject of the mail)",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.title}</span>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <Badge variant="outline">{row.original.type}</Badge>,
    },
    {
      accessorKey: "frequency",
      header: "Frequency",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.frequency}</span>
      ),
    },
    {
      accessorKey: "time",
      header: "Time",
    },
    {
      accessorKey: "emails",
      header: "Email(s)",
    },
  ];
}

"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { CommissionReport } from "../_types/commission-reports-type";

export const columns: ColumnDef<CommissionReport>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
  },
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "cr_number",
    header: "CR Number",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status.toLowerCase() === "active" ? "success" : "destructive"
          }
          className="capitalize"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "regions",
    header: "Regions",
  },
  {
    accessorKey: "attended_orders",
    header: "Attended Orders",
  },
  {
    accessorKey: "total_earnings",
    header: "Total Earnings",
  },
  {
    accessorKey: "paid_amount",
    header: "Paid Amount",
  },
  {
    accessorKey: "payable_amount",
    header: "Payable Amount",
  },
  {
    accessorKey: "payment_status",
    header: "Payment Status",
  },
  {
    id: "action",
    header: "Action",
    cell: () => {
      // Assuming there's a view page, for now just a simple button.
      // Can add correct href later if needed.
      return (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          asChild
        >
          <Link href="#">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Link>
        </Button>
      );
    },
  },
];

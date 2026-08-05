"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Printer } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { CaptainCommissionPayment } from "../_types/captain-commission-payments-type";

export const columns: ColumnDef<CaptainCommissionPayment>[] = [
  {
    accessorKey: "paid_date",
    header: "Paid Date",
  },
  {
    accessorKey: "paid_by",
    header: "Paid By",
  },
  {
    accessorKey: "paid_to",
    header: "Paid To (Captain Name)",
  },
  {
    accessorKey: "date_from_to",
    header: "Date from to",
  },
  {
    accessorKey: "order_count",
    header: "Order Count",
  },
  {
    accessorKey: "work_region",
    header: "Working Region",
  },
  {
    accessorKey: "invoice_number",
    header: "Invoice Number",
  },
  {
    accessorKey: "amount_paid",
    header: "Paid Amount",
  },
  {
    accessorKey: "payment_type",
    header: "Payment Type",
  },
  {
    id: "action",
    header: "Receipt",
    cell: ({ row }) => {
      const { document_url } = row.original;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={document_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
            inline-flex items-center justify-center
            h-9 w-9 rounded-md
            text-muted-foreground
            hover:text-foreground
            hover:bg-muted
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          "
              >
                <Printer size={20} />
              </a>
            </TooltipTrigger>
            <TooltipContent side="top">
              <span>Documents</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];

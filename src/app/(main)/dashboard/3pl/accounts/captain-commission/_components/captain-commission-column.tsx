/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { CaptainCommission } from "../_types/captain-commission-type";

export const columns: ColumnDef<CaptainCommission>[] = [
  {
    accessorKey: "emp_id",
    header: "Employee ID",
  },
  {
    accessorKey: "captain_name",
    header: "Captain Name",
  },
  {
    accessorKey: "iqama_number",
    header: "Iqama Number",
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
    accessorKey: "work_region",
    header: "Region",
  },
  {
    accessorKey: "work_area",
    header: "Area",
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
    accessorKey: "paid_commission",
    header: "Paid",
  },
  {
    accessorKey: "payable_commission",
    header: "Payable",
  },
  {
    accessorKey: "work_status",
    header: "Work Status",
  },
  {
    accessorKey: "payment_status",
    header: "Payment Status",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const router = useRouter();
      const { id, payment_status, captain_name } = row.original;

      function onView() {
        const searchParams = new URLSearchParams({
          payment_status,
          captain_name,
        });
        router.push(
          `/dashboard/3pl/accounts/captain-commission/${id}?${searchParams.toString()}`,
        );
      }

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onView()}
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
                <Eye size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <span>View</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];

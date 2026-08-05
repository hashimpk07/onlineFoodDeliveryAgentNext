"use client";
"use no memo";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, SaudiRiyal } from "lucide-react";

import { OrderLog } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_types/api";
import { OrderActionCallback } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_types/page";
import { Badge } from "@/components/ui/badge";

export const createOrderColumns = (
  onAction: OrderActionCallback,
): ColumnDef<OrderLog>[] => [
  {
    accessorKey: "delivery_date",
    header: "Date & Time",
    cell: ({ getValue }) => getValue<string>() ?? "-",
  },
  {
    accessorKey: "client_name",
    header: "Client Name",
    cell: ({ getValue }) => getValue<string>() ?? "-",
  },
  {
    accessorKey: "shop_name",
    header: "Store Name",
    cell: ({ getValue }) => getValue<string>() ?? "-",
  },
  {
    accessorFn: (row) => row.id,
    id: "order_id",
    header: "Order ID",
    cell: ({ row }) => (
      <Badge variant={"default"}>{row.original.order_number}</Badge>
    ),
  },
  {
    accessorFn: (row) => row.status.name,
    id: "order_status",
    header: "Order Status",
    cell: ({ row }) => (
      <span className={row.original.status.badge_class ?? ""}>
        {row.original.status.name ?? "-"}
      </span>
    ),
  },
  {
    accessorFn: (row) => row.amount.value,
    id: "bill_amount",
    header: "Bill Amount",
    cell: ({ row }) => (
      <span className="flex gap-2">
        {row.original.amount.value ?? 0}
        <SaudiRiyal size={20} />
      </span>
    ),
  },
  {
    accessorFn: (row) => row.payment.mode,
    id: "payment_type",
    header: "Payment Type",
    cell: ({ getValue }) => getValue<string>() ?? "-",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <button
        onClick={() => onAction(row.original)}
        disabled={!row.original.payment.can_edit}
        className={`text-primary hover:underline ${
          !row.original.payment.can_edit
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        <Edit size={12} />
      </button>
    ),
  },
];

"use client";
"use no memo";

import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, SaudiRiyal, XCircle } from "lucide-react";

import { ClientIdBadge } from "@/app/[locale]/(main)/dashboard/client/orders/_components/columns-badges/client-id-badge";
import { IdChip } from "@/app/[locale]/(main)/dashboard/client/orders/_components/columns-badges/orderid-badge";
import { StatusBadge } from "@/app/[locale]/(main)/dashboard/client/orders/_components/columns-badges/status-badge";
import { RowActions } from "@/app/[locale]/(main)/dashboard/client/orders/_components/orders-table/row-actions";
import { Order } from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { FINISHED } from "@/lib/order-status";

export const createColumns = (
  onMessage: (orderId: string, clientOrderId: string) => void,
  onCancel: (orderId: string) => void,
  onReturn: (orderId: string, reason: string) => void,
  onView: (orderId: string | number) => void,
): ColumnDef<Order>[] => [
  {
    accessorKey: "order_id",
    header: "Order ID",
    cell: ({ getValue }) => <IdChip value={getValue<string>()} />,
  },
  {
    accessorKey: "client_order_id",
    header: "Client ID",
    cell: ({ getValue }) => (
      <ClientIdBadge value={getValue<number | string>()} />
    ),
  },
  {
    accessorKey: "shopname",
    header: "Shop Name",
  },
  {
    id: "area",
    header: "Area",
    accessorFn: (row) => row.area ?? row.zone ?? "-",
  },
  {
    accessorKey: "zone",
    header: "Zone",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount ?? "0.00";
      return (
        <span className="flex items-center gap-1.5">
          <SaudiRiyal size={14} />
          <span className="text-emerald-600 text-sm font-medium">{amount}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "delivery_charge",
    header: "Del. Charge",
    cell: ({ getValue }) => {
      const raw = getValue<string>() ?? "0.00";
      const charge = raw.replace(/sar/i, "").trim() || "0.00";
      return (
        <span className="flex items-center gap-1.5">
          <SaudiRiyal size={14} />
          <span className="text-sm text-emerald-600  font-medium">
            {charge}
          </span>
        </span>
      );
    },
  },
  {
    accessorKey: "order_date",
    header: "Order Date",
  },
  {
    id: "status",
    header: "Status",
    accessorFn: (row) =>
      typeof row.status === "string" ? row.status : (row.status?.name ?? "-"),
    cell: ({ row }) => {
      const status =
        typeof row.original.status === "string"
          ? row.original.status
          : row.original.status?.name;
      const statusId =
        typeof row.original.status === "object"
          ? row.original.status.id
          : undefined;

      return <StatusBadge status={status} statusId={statusId} />;
    },
  },

  {
    id: "captain",
    header: "Captain",
    cell: ({ row }) => {
      const isAssigned = !!row.original.captain?.name;

      return (
        <span
          className={`flex font-bold items-center gap-1 ${isAssigned ? "text-green-500" : "text-red-400"}`}
        >
          {isAssigned ? <CheckCircle size={14} /> : <XCircle size={14} />}
          {isAssigned ? row.original.captain?.name : "Not Assigned"}
        </span>
      );
    },
    accessorKey: "captain",
  },
  /*  eslint-disable complexity */

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;
      const actions = order.actions;

      const canCancel = Boolean(actions?.can_cancel);
      const canReturn = Boolean(actions?.can_return);
      const complaintCount = actions?.open_complaint_count ?? 0;

      const statusName =
        typeof order.status === "string" ? order.status : order.status?.name;
      const copyMessages = [
        `Client Order id: ${order.client_order_id}`,
        `order id: ${order.id}`,
        `Status: ${statusName ?? "-"}`,
        `Captain Name: ${order.captain?.name ?? "Not Assigned"}`,
        `Branch: ${order.shopname ?? "-"}`,
        `Date: ${order.order_date ?? "-"}`,
      ];
      const copyText = copyMessages.join("\n");
      const orderId = order.id.toString();
      const returnOriginReson = order.return_origin_reason;
      const orderStatus =
        typeof order.status === "object" ? order.status?.id : undefined;

      const canMessage =
        orderStatus !== undefined && !FINISHED.includes(orderStatus);

      return (
        <RowActions
          copyText={copyText}
          complaintCount={complaintCount}
          canCancel={canCancel}
          canReturn={canReturn}
          canMessage={canMessage}
          onMessage={() =>
            onMessage(orderId, order.client_order_id?.toString() || "")
          }
          onCancel={() => onCancel(orderId)}
          onReturn={() => onReturn(orderId, returnOriginReson ?? "")}
          onView={() => {
            onView(orderId);
          }}
        />
      );
    },
  },
];

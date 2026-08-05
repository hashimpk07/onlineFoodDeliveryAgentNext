"use client";
import { ColumnDef } from "@tanstack/react-table";

import { calculateOrderProgress } from "@/app/[locale]/(main)/dashboard/general/complaints/pending-orders/_utils/order-progress";

import { PendingOrders } from "../_types";

const formatAmount = (
  val: number | string | null | undefined,
  fallback = "-",
) => {
  if (val === null || val === undefined || val === "") return fallback;
  const num = Number(val);
  if (isNaN(num)) return fallback;
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const pendingOrdersColumns = (): ColumnDef<PendingOrders>[] => [
  {
    accessorKey: "order_id",
    header: "Order ID",
    cell: ({ row }) => <div>{row.getValue("order_id") ?? "-"}</div>,
  },
  {
    accessorKey: "client_order_id",
    header: "Client ID",
    cell: ({ row }) => <div>{row.getValue("client_order_id") ?? "-"}</div>,
  },
  {
    accessorKey: "client_name",
    header: "Client Name",
    cell: ({ row }) => <div>{row.getValue("client_name") ?? "-"}</div>,
  },
  {
    accessorKey: "shop_name",
    header: "Shop Name",
    cell: ({ row }) => <div>{row.getValue("shop_name") ?? "-"}</div>,
  },
  {
    accessorKey: "area",
    header: "Area",
    cell: ({ row }) => <div>{row.getValue("area") ?? "-"}</div>,
  },
  {
    accessorKey: "zone",
    header: "Zone",
    cell: ({ row }) => <div>{row.getValue("zone") ?? "-"}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div>{formatAmount(row.getValue("amount"), "0.00")}</div>
    ),
  },
  {
    accessorKey: "delivery_type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("delivery_type") ?? "-"}</div>,
  },
  {
    accessorKey: "updated_at",
    header: "Updated at",
    cell: ({ row }) => <div>{row.getValue("updated_at") ?? "-"}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.original.status?.name ?? "-"}</div>,
  },
  {
    accessorKey: "captain",
    header: "Assigned Captain",
    cell: ({ row }) => <div>{row.original.captain?.name ?? "-"}</div>,
  },
  {
    id: "timer",
    header: "Timer",
    cell: ({ row }) => {
      const progress = calculateOrderProgress({
        start_time: row.original.timer?.start_time,
        end_time: row.original.timer?.end_time,
      });

      const colorMap = {
        blue: "bg-blue-500",
        orange: "bg-orange-500",
        red: "bg-red-600",
      };

      const colorClass = colorMap[progress.type];
      const textColor = progress.width < 50 ? "text-black" : "text-white";

      return (
        <div className="w-[120px]">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden relative">
            <div
              className={`h-full transition-all duration-500 ${colorClass} ${
                progress.isPulse ? "animate-pulse" : ""
              }`}
              style={{ width: `${progress.width}%` }}
            />
            <div
              className={`absolute inset-0 flex items-center justify-center text-xs font-semibold pointer-events-none ${textColor}`}
            >
              {progress.text}
            </div>
          </div>
        </div>
      );
    },
  },
];

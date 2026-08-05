/* eslint-disable */

"use client";
"use no memo";

import { Order } from "@/app/[locale]/(main)/dashboard/3pl/order/_types/api";
import { calculateOrderProgress } from "@/app/[locale]/(main)/dashboard/3pl/order/_utils/order-progress";
import {
  Status,
  STATUS_CONFIG,
} from "@/app/[locale]/(main)/dashboard/3pl/order/_utils/status-config";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Eye, SaudiRiyal, XCircle } from "lucide-react";

const generateBg = (type: string) => {
  switch (type?.toLowerCase()) {
    case "high":
      return "bg-primary text-primary-foreground";
    case "medium":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const createOrdersColumns = (
  onView: (id: number) => void,
  onEdit: (id: number) => void,
  now: number,
): ColumnDef<Order>[] => [
  // {
  //   id: "serial",
  //   header: "#",
  //   cell: ({ row, table }) => {
  //     // Get current page index and page size from table state
  //     const { pageIndex, pageSize } = table.getState().pagination;
  //     // Calculate serial number: (pageIndex * pageSize) + rowIndex + 1
  //     return <span>{pageIndex * pageSize + row.index + 1}</span>;
  //   },
  // },
  {
    accessorKey: "order_id",
    header: "Order ID",
    cell: ({ getValue }) => (
      <Badge
        variant="outline"
        className={cn(
          "rounded-md",
          "font-mono font-medium",
          "text-sm px-2.5 py-1",
          "border-border",
          "bg-muted/30",
          "text-slate-700 dark:text-slate-300",
        )}
      >
        OR#{getValue<string>()}
      </Badge>
    ),
  },
  {
    accessorKey: "client_order_id",
    header: "Client ID",
    cell: ({ row }) => {
      const clientId = row.getValue<string>("client_order_id");
      return (
        <>
          <Badge
            variant="outline"
            className={cn(
              "inline-flex items-center",
              "rounded-md px-2 py-1",
              "text-sm font-mono font-medium",
              "bg-blue-600/10 text-blue-400",
            )}
          >
            #{clientId}
          </Badge>
        </>
      );
    },
  },
  {
    accessorKey: "client_name",
    header: "Client Name",
  },
  {
    accessorKey: "shop_name",
    header: "Shop Name",
    cell: ({ row }) => {
      const shopname = row.original.shop_name;

      const maxLength = 12;
      const trimmed =
        shopname.length > maxLength
          ? shopname.slice(0, maxLength) + "..."
          : shopname;

      return (
        <div className="truncate max-w-[140px] cursor-pointer" title={shopname}>
          {trimmed}
        </div>
      );
    },
  },
  {
    accessorKey: "area",
    header: "Area",
  },
  {
    accessorKey: "zone",
    header: "Zone",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      if (!value) return "N/A";

      return (
        <div className="flex flex-col gap-1 max-w-[250px]">
          {value.split(",").map((region, i) => (
            <Badge key={i} variant="outline" className="max-w-full">
              {region.trim()}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => {
      const value = getValue<string>();

      if (!value) {
        return <span className="text-muted-foreground">N/A</span>;
      }

      return (
        <div className="flex flex-wrap gap-2">
          {value.split(",").map((amount, index) => (
            <Badge
              key={index}
              variant="outline"
              className="
          flex items-center gap-1 w-fit
          bg-yellow-100
          text-yellow-900
          border-yellow-300
          dark:bg-yellow-900/30
          dark:text-yellow-100
          dark:border-yellow-700
          font-semibold
        "
            >
              {amount.trim()}
              <SaudiRiyal className="h-3.5 w-3.5" />
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ getValue }) => (
      <Badge variant="destructive" className={generateBg(getValue<string>())}>
        {getValue<string>()}
      </Badge>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Updated at",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <Badge variant="outline">{value}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("status") as Status;
      const status = STATUS_CONFIG[value];

      if (!status) {
        return <span className="text-gray-500">{value}</span>;
      }

      return (
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "assigned_captain",
    header: "Captain",
    cell: ({ row }) => {
      const captain = row.getValue<string>("assigned_captain");
      const isAssigned = !!captain;

      return (
        <span
          className={`flex font-bold items-center gap-1 ${
            isAssigned ? "text-green-500" : "text-red-400"
          }`}
        >
          {isAssigned ? <CheckCircle size={14} /> : <XCircle size={14} />}
          {isAssigned ? captain : "Not Assigned"}
        </span>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }: { row: any }) => {
      const orderId = row.original.order_id;
      return (
        // <RowActions
        //   onView={() => onView(orderId)}
        //   onEdit={() => onEdit(orderId)}
        // />
        <Eye onClick={() => onView(orderId)} className="cursor-pointer" />
      );
    },
  },
  {
    id: "timer",
    header: "Timer",
    cell: ({ row }) => {
      const progress = calculateOrderProgress(
        {
          start_time: row.original.timer?.start_time,
          end_time: row.original.timer?.end_time,
        },
        now,
      );

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

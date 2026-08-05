"use client";
"use no memo";

import { ColumnDef } from "@tanstack/react-table";

import { Order } from "../_types/order-report-type";
import {
  formatDate,
  formatTime,
  safeValue,
} from "../_utils/order-report-utils";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "order_id",
    header: "Order ID",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "client_order_id",
    header: "Client Order ID",
    cell: ({ getValue }) => safeValue(getValue<string>()),
    // cell: ({ row }) => row.original.order_id ?? row.original.id ?? "N/A",
  },
  {
    accessorKey: "order_type",
    header: "Order Type",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "cod_amount",
    header: "COD Amount",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "client_name",
    header: "Client Name",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "shop_name",
    header: "Shop Name",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "shop_zone",
    header: "Shop Zone",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "shop_area",
    header: "Shop Area",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "shop_region",
    header: "Shop Region",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "captain",
    header: "Captain",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "assigned_by",
    header: "Assigned By",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "order_status",
    header: "Order Status",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "cancellation_reason",
    header: "Cancellation Reason",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "cancelled_by",
    header: "Cancelled By",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => safeValue(getValue<string>()),
    // cell: ({ row }) => formatDate(row.original.date ?? row.original.created_at),
  },
  {
    accessorKey: "created_at",
    header: "New Order (Created At)",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "order_accepted_at",
    header: "Order Accepted",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "order_accepted_time",
    header: "Order Accepted Time",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "start_ride_at",
    header: "Start Ride",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "start_ride_time",
    header: "Start Ride Time",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "reached_shop_at",
    header: "Reached Shop",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "reached_shop_time",
    header: "Reached Shop Time",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "order_picked_at",
    header: "Order Picked",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "order_picked_time",
    header: "Order Picked Time",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "shipped_at",
    header: "Shipped",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "shipped_time",
    header: "Shipped Time",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "reached_dest_at",
    header: "Reached Destination",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "reached_dest_time",
    header: "Reached Destination Time",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "business_day",
    header: "Business Day",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "final_status_at",
    header: "Final Status",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "final_status_time",
    header: "Final Status Time",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "acceptance_time",
    header: "Acceptance Time",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "arrival_time",
    header: "Arrival Time",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "reached_time",
    header: "Reached Time",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "picked_time",
    header: "Picked Time",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "pickup_to_delivery_time",
    header: "Pickup to Delivery Time",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "process_time",
    header: "Process Time In Minutes",
    cell: ({ getValue }) => safeValue(getValue<string>()),
  },
  {
    accessorKey: "distance",
    header: "Distance B/W",
    cell: ({ getValue }) => {
      const value = getValue<number | string | null>();
      if (value === null || value === "" || value === "N/A") return "N/A";
      const valStr = String(value);
      return valStr.toUpperCase().includes("KM") ? valStr : `${valStr} KM`;
    },
  },
];

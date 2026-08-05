"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { CompanyEarningOrder } from "../_types/company-earning-type";

export const columns: ColumnDef<CompanyEarningOrder>[] = [
  {
    accessorKey: "order_date",
    header: "Order Date",
    cell: ({ getValue }) => {
      const dateStr = getValue<string>();
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB");
    },
  },
  {
    accessorKey: "order_number",
    header: "Order Number",
  },
  /* {
    accessorKey: "client_name",
    header: "Client Name",
  },
  {
    accessorKey: "shop_name",
    header: "Shop Name",
  },
  {
    accessorKey: "awb",
    header: "AWB",
  }, */
  {
    accessorKey: "distance_shop_delivery",
    header: () => <div className="text-center">Dist.b/w Shop & Delivery</div>,
    cell: ({ getValue }) => (
      <div className="text-center">{getValue<string | number>()}</div>
    ),
  },
  {
    accessorKey: "extra_km",
    header: "On Duty Extra KM",
  },
  {
    accessorKey: "delivery_date",
    header: "Delivered Date",
    cell: ({ getValue }) => {
      const dateStr = getValue<string>();
      const date = new Date(dateStr);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
  {
    accessorKey: "order_status",
    header: "Order Status",
  },
  {
    accessorKey: "captain",
    header: "Captain",
  },
  {
    accessorKey: "iqama_no",
    header: "Iqama No",
  },
  {
    accessorKey: "bd_earning",
    header: "B.D Earning",
  },
  {
    accessorKey: "ekm_earning",
    header: "E.KM. Earning",
  },
  {
    accessorKey: "total_earning",
    header: "T. Earning",
  },
  {
    accessorKey: "sub_total",
    header: "Sub total",
  },
  {
    accessorKey: "payments",
    header: "Payments",
  },
];

/* eslint-disable */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TicketRecord } from "../_types";

const findValueByKeys = (obj: any, keys: string[], depth = 0): any => {
  if (!obj || typeof obj !== "object" || depth > 5) return null;

  for (const key of keys) {
    const val = obj[key];
    if (val !== undefined && val !== null && val !== "") {
      if (typeof val !== "object" || Object.keys(val).length > 0) {
        return val;
      }
    }
  }

  for (const k in obj) {
    if (obj[k] && typeof obj[k] === "object" && !Array.isArray(obj[k])) {
      const val = findValueByKeys(obj[k], keys, depth + 1);
      if (val !== undefined && val !== null && val !== "") {
        return val;
      }
    }
  }
  return null;
};

const findObjectByKeys = (obj: any, keys: string[], depth = 0): any => {
  if (!obj || typeof obj !== "object" || depth > 5) return null;

  for (const key of keys) {
    const val = obj[key];
    if (val && typeof val === "object" && !Array.isArray(val)) {
      return val;
    }
  }

  for (const k in obj) {
    if (obj[k] && typeof obj[k] === "object" && !Array.isArray(obj[k])) {
      const val = findObjectByKeys(obj[k], keys, depth + 1);
      if (val) return val;
    }
  }
  return null;
};

const renderSafe = (val: any) => {
  if (val === null || val === undefined) return "-";
  if (typeof val === "object") {
    return (
      val?.preview ??
      val?.full ??
      val?.label ??
      val?.name ??
      val?.name_en ??
      val?.name_ar ??
      val?.title ??
      val?.ticket_no ??
      val?.type ??
      val?.email ??
      val?.id ??
      JSON.stringify(val)
    );
  }
  return String(val);
};

const getDate = (row: TicketRecord) => {
  const dateVal = findValueByKeys(row, [
    "status_date",
    "date",
    "created_at",
    "open_time",
    "opened_at",
    "ticket_date",
    "created_date",
  ]);
  if (dateVal) {
    const str = String(dateVal);
    if (str.includes("T")) return str.split("T")[0];
    if (str.includes(" ")) return str.split(" ")[0];
    return str;
  }
  return "-";
};

const getTime = (row: TicketRecord) => {
  const timeVal = findValueByKeys(row, [
    "time",
    "created_at",
    "open_time",
    "opened_at",
  ]);
  if (timeVal) {
    const str = String(timeVal);
    if (str.includes("T")) {
      const timePart = str.split("T")[1];
      if (timePart) return timePart.split(".")[0];
    } else if (str.includes(" ")) {
      return str.split(" ")[1];
    }
    return str;
  }
  return "-";
};

const getTicketType = (row: TicketRecord) => {
  const typeObj = findObjectByKeys(row, ["ticket_type", "type", "label"]);
  if (typeObj) {
    return renderSafe(typeObj);
  }
  const nameVal = findValueByKeys(row, [
    "ticket_type_name",
    "type_name",
    "label",
    "ticket_type",
    "type",
  ]);
  return renderSafe(nameVal);
};

const getZone = (row: TicketRecord) => {
  const zoneVal = findValueByKeys(row, [
    "zone_name",
    "zone",
    "shop_zone",
    "work_zone",
    "zone_id",
  ]);
  return renderSafe(zoneVal);
};

const getArea = (row: TicketRecord) => {
  const areaVal = findValueByKeys(row, [
    "area_name",
    "area",
    "region_name",
    "region",
    "work_area",
    "shop_area",
    "area_id",
  ]);
  return renderSafe(areaVal);
};

const getRegion = (row: TicketRecord) => {
  const regionVal = findValueByKeys(row, [
    "quadrant_name",
    "quadrant",
    "work_region",
    "shop_region",
    "region_name",
    "region",
    "region_id",
  ]);
  return renderSafe(regionVal);
};

const getOpenTime = (row: TicketRecord) => {
  const openTimeVal = findValueByKeys(row, [
    "open_time",
    "opened_at",
    "created_at",
    "open_date",
  ]);
  return renderSafe(openTimeVal);
};

const getCloseTime = (row: TicketRecord) => {
  const closeTimeVal = findValueByKeys(row, [
    "close_time",
    "closed_at",
    "updated_at",
    "close_date",
  ]);
  return renderSafe(closeTimeVal);
};

const getClosingPeriod = (row: TicketRecord) => {
  const closingPeriodVal = findValueByKeys(row, [
    "closing_period",
    "closing_duration",
    "duration",
  ]);
  return renderSafe(closingPeriodVal);
};

export const ticketColumns: ColumnDef<TicketRecord>[] = [
  {
    accessorKey: "status_date",
    header: "Date",
    cell: ({ row }) => getDate(row.original),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => getTime(row.original),
  },
  {
    accessorKey: "ticket_type",
    header: "Ticket Type",
    cell: ({ row }) => getTicketType(row.original),
  },
  {
    accessorKey: "zone",
    header: "Zone",
    cell: ({ row }) => getZone(row.original),
  },
  {
    accessorKey: "area",
    header: "Area",
    cell: ({ row }) => getArea(row.original),
  },
  {
    accessorKey: "region",
    header: "Region",
    cell: ({ row }) => getRegion(row.original),
  },
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => renderSafe(row.original.client),
  },
  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => renderSafe(row.original.branch),
  },
  {
    accessorKey: "order_ref",
    header: "Order Ref",
    cell: ({ row }) => renderSafe(row.original.order_ref),
  },
  {
    accessorKey: "client_order_id",
    header: "Client Order ID",
    cell: ({ row }) => renderSafe(row.original.client_order_id),
  },
  {
    accessorKey: "captain",
    header: "Captain",
    cell: ({ row }) => renderSafe(row.original.captain),
  },
  {
    accessorKey: "attended_by",
    header: "Attended By",
    cell: ({ row }) => renderSafe(row.original.attended_by),
  },
  {
    accessorKey: "ticket",
    header: "Ticket",
    cell: ({ row }) => {
      const ticketVal =
        row.original.ticket_no ??
        row.original.ticket?.ticket_no ??
        row.original.ticket ??
        row.original.id;
      return renderSafe(ticketVal);
    },
  },
  {
    accessorKey: "open_time",
    header: "Ticket Open Time",
    cell: ({ row }) => getOpenTime(row.original),
  },
  {
    accessorKey: "close_time",
    header: "Close Time",
    cell: ({ row }) => getCloseTime(row.original),
  },
  {
    accessorKey: "closing_period",
    header: "Closing Period",
    cell: ({ row }) => getClosingPeriod(row.original),
  },
];

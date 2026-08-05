/* eslint-disable */

"use client";
"use no memo";

import { Captain } from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/api";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

const STATUS_BG_MAP: Record<string, string> = {
  high: "bg-green-800 text-white",
  medium: "bg-yellow-400 text-white",
  default: "bg-gray-400 text-foreground",
};

const generateBg = (type?: string) => {
  if (!type) return STATUS_BG_MAP.default;
  return STATUS_BG_MAP[type.toLowerCase()] || STATUS_BG_MAP.default;
};

const WORK_STATUS_VARIANTS: Record<string, string> = {
  Active: "bg-green-500 text-white",
  Leave: "bg-yellow-500 text-yellow-950",
  Inactive: "bg-gray-300 text-foreground",
  Banned: "bg-destructive text-destructive-foreground",
};

export const createCaptainColumns = (
  onView: (id: number) => void,
  onEdit: (id: number) => void,
): ColumnDef<Captain>[] => [
  {
    id: "serial",
    header: "#",
    cell: ({ row, table }) => {
      // Get current page index and page size from table state
      const { pageIndex, pageSize } = table.getState().pagination;
      // Calculate serial number: (pageIndex * pageSize) + rowIndex + 1
      return <span>{pageIndex * pageSize + row.index + 1}</span>;
    },
  },
  {
    accessorKey: "code",
    header: "EMP ID",
    cell: ({ row }) => {
      const empId = row.getValue<string>("code");
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
            #{empId}
          </Badge>
        </>
      );
    },
  },
  {
    accessorKey: "captain_name",
    header: "Captain Name",
  },
  {
    accessorKey: "mobile_no",
    header: "Mobile No",
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
    accessorKey: "total_delivery",
    header: "Total Delivery",
  },
  {
    accessorKey: "region",
    header: "Region",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      if (!value) return "N/A";

      const regions = value.split(",").map((region) => region.trim());

      return (
        <div className="grid grid-cols-2 gap-1 min-w-[120px]">
          {regions.map((region, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs px-1 py-0 h-5 bg-green-100 text-green-700 border-black-300 hover:bg-blue-100"
            >
              {region}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "area",
    header: "Area",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      if (!value) return "N/A";

      const areas = value.split(",").map((area) => area.trim());

      return (
        <div className="grid grid-cols-3 gap-1 min-w-[340px]">
          {areas.map((area, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs px-1 py-0 h-5 bg-purple-100 text-purple-700 border-black-300 hover:bg-purple-100"
            >
              {area}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "shift_status",
    header: "Shift Status",
    cell: ({ getValue }) => {
      const value = getValue<string>();

      return (
        <Badge
          className={cn(
            "text-white",
            value === "ONLINE" ? "bg-green-300" : "bg-red-300",
          )}
        >
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "vehicle_type",
    header: "Vehicle Type",
  },
  {
    accessorKey: "vehicle_number",
    header: "Vehicle No",
  },
  {
    accessorKey: "app_version",
    header: "App Current Version",
    cell: ({ getValue }) => (
      <span className="">{getValue<string>() || "N/A"}</span>
    ),
  },
  /* {
          id: "action",
          header: "Action",
          cell: ({ row }: { row: any }) => {
            const captainId = row.original.id;
            return (
              <RowActions
                onView={() => onView(captainId)}
                onEdit={() => onEdit(captainId)}
              />
            );
          },
        }, */
];

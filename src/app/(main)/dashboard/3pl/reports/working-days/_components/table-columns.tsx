"use client";

import { useMemo } from "react";

import { ColumnDef } from "@tanstack/react-table";

import { CaptainWorkingDayReport } from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_types/api";
import {
  DynamicHeaderConfig,
  HeaderGroup,
} from "@/components/data-table/dynamic-header-table";

type Props = {
  reports: CaptainWorkingDayReport[];
};

type UseCaptainWorkingDaysReturn = {
  columns: ColumnDef<CaptainWorkingDayReport>[];
  dynamicHeaderConfig: DynamicHeaderConfig;
};

export function useCaptainWorkingDaysTableCoulmns({
  reports,
}: Props): UseCaptainWorkingDaysReturn {
  /**
   * Extract & sort unique date keys
   */
  const dateKeys = useMemo(() => {
    if (!reports || reports.length === 0) return [];

    const datesSet = new Set<string>();

    reports.forEach((report) => {
      Object.keys(report.date || {}).forEach((dateKey) => {
        datesSet.add(dateKey);
      });
    });

    return Array.from(datesSet).sort((a, b) => {
      const parseDate = (dateStr: string) => {
        const [day, month] = dateStr.split("-");
        const monthIndex = new Date(`${month} 1, 2024`).getMonth();
        return new Date(2024, monthIndex, parseInt(day));
      };

      return parseDate(a).getTime() - parseDate(b).getTime();
    });
  }, [reports]);

  /**
   * Generate columns
   */
  const columns = useMemo<ColumnDef<CaptainWorkingDayReport>[]>(() => {
    const staticColumns: ColumnDef<CaptainWorkingDayReport>[] = [
      {
        accessorKey: "captain_name",
        header: "Captain Name",
        cell: ({ row }) => (
          <div className="font-medium">{row.original.captain_name}</div>
        ),
      },
      {
        accessorKey: "iqama_no",
        header: "Iqama No",
        cell: ({ row }) => (
          <div className="text-sm">{row.original.iqama_no}</div>
        ),
      },
      {
        accessorKey: "regions",
        header: "Regions",
        cell: ({ row }) => (
          <div className="text-sm">
            {row.original.regions?.join(", ") || "N/A"}
          </div>
        ),
      },
    ];

    const dynamicColumns: ColumnDef<CaptainWorkingDayReport>[] =
      dateKeys.flatMap((dateKey) => [
        {
          id: `${dateKey}-working_h`,
          // eslint-disable-next-line security/detect-object-injection
          accessorFn: (row) => row.date?.[dateKey]?.working_h ?? "Nil",
          header: "Working Hours",
          cell: ({ row }) => (
            <div className="text-center text-sm">
              {/* eslint-disable-next-line security/detect-object-injection */}
              {row.original.date?.[dateKey]?.working_h ?? "Nil"}
            </div>
          ),
        },
        {
          id: `${dateKey}-o_count`,
          // eslint-disable-next-line security/detect-object-injection
          accessorFn: (row) => row.date?.[dateKey]?.o_count ?? "Nil",
          header: "Order Count",
          cell: ({ row }) => (
            <div className="text-center text-sm">
              {/* eslint-disable-next-line security/detect-object-injection */}
              {row.original.date?.[dateKey]?.o_count ?? "Nil"}
            </div>
          ),
        },
      ]);

    return [...staticColumns, ...dynamicColumns];
  }, [dateKeys]);

  /**
   * Multi-level header config
   */
  const dynamicHeaderConfig = useMemo<DynamicHeaderConfig>(() => {
    const firstRow: HeaderGroup[] = [
      { label: "Captain Name", rowspan: 2, className: "min-w-[150px]" },
      { label: "Iqama No", rowspan: 2, className: "min-w-[120px]" },
      { label: "Regions", rowspan: 2, className: "min-w-[150px]" },
    ];

    dateKeys.forEach((dateKey) => {
      firstRow.push({
        label: dateKey,
        colspan: 2,
        className: "min-w-[100px]",
      });
    });

    const secondRow: HeaderGroup[] = [];

    dateKeys.forEach(() => {
      secondRow.push(
        { label: "Working Hours", className: "min-w-[100px] text-xs" },
        { label: "Order Count", className: "min-w-[100px] text-xs" },
      );
    });

    return {
      enableMultiHeader: true,
      headerGroups: [firstRow, secondRow],
      headerClassName: "",
    };
  }, [dateKeys]);

  return {
    columns,
    dynamicHeaderConfig,
  };
}

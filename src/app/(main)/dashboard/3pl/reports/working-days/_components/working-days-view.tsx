"use client";
"use no memo";

import { WorkingDaysFilter } from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_components/filter-panel";
import { WorkingDaysTable } from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_components/working-days-table";

export const WorkingDaysPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <WorkingDaysFilter />

      <div className="flex-1 rounded-md border relative bg-card shadow-sm w-full min-w-0 overflow-hidden">
        <WorkingDaysTable />
      </div>
    </div>
  );
};

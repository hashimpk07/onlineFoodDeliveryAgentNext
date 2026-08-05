"use client";

import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import CommissionReportsView from "./_components/commission-reports-view";

export default function CommissionReportsPage() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
          3PL Commission Reports
        </h1>
        <AppBreadcrumb
          routes={[
            { label: "Dashboard", href: "/dashboard/3pl/dashboard" },
            { label: "3PL Commission Reports" },
          ]}
        />
      </div>
      <PlaceholderContent>
        <CommissionReportsView />
      </PlaceholderContent>
    </>
  );
}

"use client";

import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import EmployeeView from "./_components/employee-view";

export default function OrderReportPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/dashboard/3pl/home" },
          { label: "Employee" },
        ]}
      />
      <PlaceholderContent>
        <EmployeeView />
      </PlaceholderContent>
    </>
  );
}

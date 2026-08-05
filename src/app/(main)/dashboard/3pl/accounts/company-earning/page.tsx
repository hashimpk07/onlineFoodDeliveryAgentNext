"use client";

import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import CompanyEarningView from "./_components/company-earning-view";

export default function CompanyEarningPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/dashboard/3pl/home" },
          { label: "Company Earnings" },
        ]}
      />
      <PlaceholderContent>
        <CompanyEarningView />
      </PlaceholderContent>
    </>
  );
}

"use client";

import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import CompanyEarningView from "./_components/captain-commission-view";

export default function CaptainCommissionPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/dashboard/3pl/home" },
          { label: "Captain Commission" },
        ]}
      />
      <PlaceholderContent>
        <CompanyEarningView />
      </PlaceholderContent>
    </>
  );
}

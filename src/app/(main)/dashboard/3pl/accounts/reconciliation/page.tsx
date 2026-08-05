"use client";

import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import ReconciliationView from "./_components/reconciliation-view";

export default function CompanyReconciliationPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/dashboard/3pl/home" },
          { label: "Reconciliations" },
        ]}
      />
      <PlaceholderContent>
        <ReconciliationView />
      </PlaceholderContent>
    </>
  );
}

"use client";

import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import CompanyInfoView from "./_components/general-view";

export default function CompanyInfoPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[{ label: "Home", href: "/" }, { label: "Company Info" }]}
      />

      <PlaceholderContent>
        <CompanyInfoView />
      </PlaceholderContent>
    </>
  );
}

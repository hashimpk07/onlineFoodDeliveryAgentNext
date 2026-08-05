"use client";

import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import OrderReportView from "./_components/order-view";

export default function OrderReportPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[{ label: "Home", href: "/" }, { label: "Order Report" }]}
      />
      <PlaceholderContent>
        <OrderReportView />
      </PlaceholderContent>
    </>
  );
}

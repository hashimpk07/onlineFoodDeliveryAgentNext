"use client";

import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import CaptainCommissionPaymentView from "./_components/captain-commission-payments-view";

export default function CaptainCommissionPaymentPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/dashboard/3pl/home" },
          {
            label: "Captain Commission",
            href: "/dashboard/3pl/accounts/captain-commission",
          },
          { label: "Payments" },
        ]}
      />
      <PlaceholderContent>
        <CaptainCommissionPaymentView />
      </PlaceholderContent>
    </>
  );
}

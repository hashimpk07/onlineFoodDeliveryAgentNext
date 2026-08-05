"use client";

import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import CaptainCommissionConfirmPaymentView from "./_components/captain-commission-confirm-payment-view";

export default function CaptainCommissionConfirmPaymentPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/dashboard/3pl/home" },
          {
            label: "Captain Commission",
            href: "/dashboard/3pl/accounts/captain-commission",
          },
          {
            label: "Payments",
            href: "/dashboard/3pl/accounts/captain-commission/captain-commission-payment",
          },
          { label: "Confirm Payment" },
        ]}
      />
      <PlaceholderContent>
        <CaptainCommissionConfirmPaymentView />
      </PlaceholderContent>
    </>
  );
}

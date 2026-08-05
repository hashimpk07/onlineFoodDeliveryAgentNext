import { use } from "react";

import CaptainCommissionPaymentView from "@/app/[locale]/(main)/dashboard/3pl/accounts/captain-commission/captain-commission-payment/_components/captain-commission-payments-view";
import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import CaptainCommissionDetailsView from "../captain-commission-details/_components/captain-commission-details-view";

interface PageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
  searchParams: Promise<{
    payment_status?: string;
    captain_name?: string;
  }>;
}

export default function CaptainCommissionDetailsPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = use(params);
  const { captain_name, payment_status } = use(searchParams);

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
            label: captain_name
              ? `Commission report of ${captain_name}`
              : "Captain Commission Payment",
            href: "/dashboard/3pl/accounts/captain-commission",
          },
        ]}
      />
      {captain_name ? (
        <PlaceholderContent>
          <CaptainCommissionDetailsView
            id={id}
            paymentStatus={payment_status}
            captainName={captain_name}
          />
        </PlaceholderContent>
      ) : (
        <PlaceholderContent>
          <CaptainCommissionPaymentView />
        </PlaceholderContent>
      )}
    </>
  );
}

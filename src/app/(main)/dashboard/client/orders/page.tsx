// "use client";
import OrdersViewPage from "@/app/[locale]/(main)/dashboard/client/orders/_components/order-view";
import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

export default function OrdersPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[{ label: "Home", href: "/" }, { label: "Orders" }]}
      />
      <PlaceholderContent>
        <OrdersViewPage />
      </PlaceholderContent>
    </>
  );
}

import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import PendingOrdersView from "./_components/pending-orders-view";

export default function SalaryPaymentsPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/dashboard/home" },
          { label: "Complaints" },
          { label: "Pending Orders" },
        ]}
      />
      <div className="p-4 sm:p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Pending Orders</h1>
        </div>
        <PendingOrdersView />
      </div>
    </>
  );
}

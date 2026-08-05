import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import TicketsView from "./_components/tickets-view";

export default function TicketReportPage() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/dashboard/home" },
          { label: "Complaints" },
          { label: "Ticket Report" },
        ]}
      />
      <div className="p-4 sm:p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Ticket Report</h1>
        </div>
        <TicketsView />
      </div>
    </>
  );
}

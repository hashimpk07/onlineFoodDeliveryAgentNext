import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

export default function Loading() {
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
        <DataTableSkeleton
          columnCount={10}
          rowCount={10}
          showViewOptions={false}
        />
      </div>
    </>
  );
}

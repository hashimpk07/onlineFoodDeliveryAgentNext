import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import { VehicleForm } from "../../_components/vehicle-form";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/" },
          { label: "Vehicle", href: "/dashboard/3pl/vehicle" },
          { label: "Edit" },
        ]}
      />
      <div className="p-6">
        <VehicleForm isEdit vehicleId={id} />
      </div>
    </>
  );
}

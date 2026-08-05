import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import { VehicleForm } from "../_components/vehicle-form";

export default function CreateVehiclePage() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/" },
          { label: "Vehicle", href: "/dashboard/3pl/vehicle" },
          { label: "Create" },
        ]}
      />

      <div className="p-6">
        <VehicleForm />
      </div>
    </>
  );
}

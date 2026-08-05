"use client";

import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

import VehicleView from "./_components/vehicle-view";

export default function VehiclePage() {
  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/dashboard/3pl/home" },
          { label: "Vehicle" },
        ]}
      />
      <PlaceholderContent>
        <VehicleView />
      </PlaceholderContent>
    </>
  );
}

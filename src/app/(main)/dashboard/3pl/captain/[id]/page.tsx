"use client";

import { useParams } from "next/navigation";

import { CaptainForm } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_components/captain-form";
import PlaceholderContent from "@/components/content/placeholder-content";
import { AppBreadcrumb } from "@/components/ui/app-breadcrumb";

export default function Captain() {
  const params = useParams();

  const id = typeof params.id === "string" ? params.id : undefined;

  const isEdit = id !== undefined && id !== "create" && /^\d+$/.test(id);

  return (
    <>
      <AppBreadcrumb
        routes={[
          { label: "Home", href: "/" },
          { label: "Captains", href: "/dashboard/3pl/captain" },
          { label: isEdit ? "Edit Captain" : "Create Captain" },
        ]}
      />

      <PlaceholderContent>
        <CaptainForm id={id} />
      </PlaceholderContent>
    </>
  );
}

import CompanyEditForm from "@/app/[locale]/(main)/dashboard/general/company-info/[id]/edit/_components/company-edit-form";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <CompanyEditForm id={id} />;
}

import CompanyDetailsView from "@/app/[locale]/(main)/dashboard/general/company-info/[id]/_components/company-details-view";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <CompanyDetailsView id={id} />;
}

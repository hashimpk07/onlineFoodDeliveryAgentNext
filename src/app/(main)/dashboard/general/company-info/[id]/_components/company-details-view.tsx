"use client";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getCompanyDetailsData } from "../../_api/get-company-details";

import {
  AppDetailsPanel,
  GeneralInfoPanel,
  PrivacyPanel,
  SocialPanel,
  TermsPanel,
} from "./company-details-sections";
import { CompanyHeader } from "./company-header";

interface CompanyDetailsViewProps {
  id: string;
}

export default function CompanyDetailsView({ id }: CompanyDetailsViewProps) {
  const router = useRouter();
  const {
    data: company,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["company-details", id],
    queryFn: () => getCompanyDetailsData(id),
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8 space-y-6">
        <Skeleton className="w-64 h-10 rounded-md" />
        <Card>
          <CardHeader>
            <Skeleton className="w-48 h-6 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !company) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
        <h2 className="text-xl font-semibold text-destructive">
          Error fetching company details
        </h2>
        <Button onClick={() => router.push("/dashboard/general/company-info")}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8">
      <CompanyHeader
        eyebrow="Company profile"
        name={company.name}
        subtitle={company.email}
        backHref="/dashboard/general/company-info"
        actions={
          <Button
            className="gap-2"
            onClick={() =>
              router.push(`/dashboard/general/company-info/${id}/edit`)
            }
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
        }
      />

      <Tabs defaultValue="general">
        <Card className="shadow-sm border-border/50 pt-0 overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-primary/5 px-4 py-3">
            <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
              <TabsTrigger
                value="general"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="app"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                App & Versions
              </TabsTrigger>
              <TabsTrigger
                value="terms"
                className="gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Terms
                <Badge variant="secondary" className="px-1.5 text-[10px]">
                  {company.terms_conditions?.length ?? 0}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Privacy
                <Badge variant="secondary" className="px-1.5 text-[10px]">
                  {company.privacy_policies?.length ?? 0}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className="gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Social
                <Badge variant="secondary" className="px-1.5 text-[10px]">
                  {company.social_media?.length ?? 0}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="p-6">
            <TabsContent value="general" className="mt-0">
              <GeneralInfoPanel company={company} />
            </TabsContent>
            <TabsContent value="app" className="mt-0">
              <AppDetailsPanel company={company} />
            </TabsContent>
            <TabsContent value="terms" className="mt-0">
              <TermsPanel terms={company.terms_conditions} />
            </TabsContent>
            <TabsContent value="privacy" className="mt-0">
              <PrivacyPanel policy={company.privacy_policies} />
            </TabsContent>
            <TabsContent value="social" className="mt-0">
              <SocialPanel social={company.social_media} />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}

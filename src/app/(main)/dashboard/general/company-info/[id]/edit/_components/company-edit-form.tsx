"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getCompanyDetailsData } from "../../../_api/get-company-details";
import { updateCompanyDetailsData } from "../../../_api/update-company";
import { CompanyHeader } from "../../_components/company-header";

import {
  AppDetailsFields,
  GeneralInfoFields,
} from "./company-edit-basic-sections";
import {
  companyFormSchema,
  companyToFormValues,
  emptyFormValues,
  formValuesToPayload,
} from "./company-edit-form-schema";
import {
  PrivacyFields,
  SocialFields,
  TermsFields,
} from "./company-edit-list-sections";

interface CompanyEditFormProps {
  id: string;
}

export default function CompanyEditForm({ id }: CompanyEditFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("general");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["company-details", id],
    queryFn: () => getCompanyDetailsData(id),
  });

  const form = useForm({
    resolver: zodResolver(companyFormSchema),
    defaultValues: emptyFormValues,
  });

  const termsArray = useFieldArray({ control: form.control, name: "terms" });
  const policiesArray = useFieldArray({
    control: form.control,
    name: "policies",
  });
  const socialArray = useFieldArray({ control: form.control, name: "social" });

  useEffect(() => {
    if (data) {
      form.reset(companyToFormValues(data));
    }
  }, [data, form]);

  const detailHref = `/dashboard/general/company-info/${id}`;

  const updateMutation = useMutation({
    mutationFn: (values: typeof emptyFormValues) =>
      updateCompanyDetailsData(id, formValuesToPayload(values)),
    onSuccess: () => {
      toast.success("Company details updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["company-info-list"] });
      queryClient.invalidateQueries({ queryKey: ["company-details", id] });
      router.push(detailHref);
    },
    onError: (error) => {
      toast.error("Failed to update company details");
      console.error(error);
    },
  });

  const onSubmit = form.handleSubmit(
    (values) => updateMutation.mutate(values),
    (errors) => {
      if (errors.name ?? errors.email ?? errors.website) {
        setActiveTab("general");
      } else if (errors.app_version ?? errors.app_version_ios) {
        setActiveTab("app");
      } else if (errors.terms) {
        setActiveTab("terms");
      } else if (errors.policies) {
        setActiveTab("privacy");
      } else if (errors.social) {
        setActiveTab("social");
      }
      toast.error("Please fix the highlighted fields before saving");
    },
  );

  if (isLoading) {
    return (
      <div className="flex justify-center p-6 md:p-8">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <Skeleton className="w-48 h-8 rounded-md mb-2" />
            <Skeleton className="w-72 h-4 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
        <h2 className="text-xl font-semibold text-destructive">
          Error fetching details.
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
        eyebrow="Editing company"
        name={data.name}
        subtitle={data.email}
        backHref={detailHref}
      />

      <Form {...form}>
        <form onSubmit={onSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                      {termsArray.fields.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="privacy"
                    className="gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Privacy
                    <Badge variant="secondary" className="px-1.5 text-[10px]">
                      {policiesArray.fields.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="social"
                    className="gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    Social
                    <Badge variant="secondary" className="px-1.5 text-[10px]">
                      {socialArray.fields.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="p-6">
                <TabsContent value="general" className="mt-0">
                  <GeneralInfoFields control={form.control} />
                </TabsContent>
                <TabsContent value="app" className="mt-0">
                  <AppDetailsFields control={form.control} />
                </TabsContent>
                <TabsContent value="terms" className="mt-0">
                  <TermsFields control={form.control} fieldArray={termsArray} />
                </TabsContent>
                <TabsContent value="privacy" className="mt-0">
                  <PrivacyFields
                    control={form.control}
                    fieldArray={policiesArray}
                  />
                </TabsContent>
                <TabsContent value="social" className="mt-0">
                  <SocialFields
                    control={form.control}
                    fieldArray={socialArray}
                  />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-border/50 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(detailHref)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

import * as z from "zod";

import { CompanyInfo, UpdateCompanyPayload } from "../../../_types";

export const companyFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  website: z
    .union([z.string().url("Please enter a valid URL"), z.literal("")])
    .optional(),
  mobile_no: z.string().optional(),
  vat_id: z.string().optional(),
  app_version: z.string().optional(),
  min_supported_version: z.string().optional(),
  app_version_ios: z.string().optional(),
  min_supported_version_ios: z.string().optional(),
  about: z.string().optional(),
  terms: z.array(
    z.object({
      term: z.string().min(1, "Term is required"),
      condition: z.string().min(1, "Condition is required"),
    }),
  ),
  policies: z.array(
    z.object({
      policy: z.string().min(1, "Policy is required"),
    }),
  ),
  social: z.array(
    z.object({
      media_term: z.string().min(1, "Platform is required"),
      link: z.string().url("Please enter a valid URL"),
    }),
  ),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;

export const emptyFormValues: CompanyFormValues = {
  name: "",
  email: "",
  website: "",
  mobile_no: "",
  vat_id: "",
  app_version: "",
  min_supported_version: "",
  app_version_ios: "",
  min_supported_version_ios: "",
  about: "",
  terms: [],
  policies: [],
  social: [],
};

const TEXT_FIELDS = [
  "name",
  "email",
  "website",
  "mobile_no",
  "vat_id",
  "app_version",
  "min_supported_version",
  "app_version_ios",
  "min_supported_version_ios",
  "about",
] as const;

function companyFieldsToFormValues(
  company: CompanyInfo,
): Omit<CompanyFormValues, "terms" | "policies" | "social"> {
  const entries = TEXT_FIELDS.map((key) => [key, company[key] ?? ""]);
  return Object.fromEntries(entries) as Omit<
    CompanyFormValues,
    "terms" | "policies" | "social"
  >;
}

export function companyToFormValues(company: CompanyInfo): CompanyFormValues {
  return {
    ...companyFieldsToFormValues(company),
    terms: (company.terms_conditions ?? []).map((item) => ({
      term: item.term ?? "",
      condition: item.condition ?? "",
    })),
    policies: (company.privacy_policies ?? []).map((item) => ({
      policy: item.policy ?? "",
    })),
    social: (company.social_media ?? []).map((item) => ({
      media_term: item.media_term ?? "",
      link: item.link ?? "",
    })),
  };
}

function emptyToUndefined(value: string): string | undefined {
  return value === "" ? undefined : value;
}

export function formValuesToPayload(
  values: CompanyFormValues,
): UpdateCompanyPayload {
  return {
    name: values.name,
    email: values.email,
    mobile_no: emptyToUndefined(values.mobile_no ?? ""),
    app_version: emptyToUndefined(values.app_version ?? ""),
    app_version_ios: emptyToUndefined(values.app_version_ios ?? ""),
    website: emptyToUndefined(values.website ?? ""),
    vat_id: emptyToUndefined(values.vat_id ?? ""),
    about: emptyToUndefined(values.about ?? ""),
    min_supported_version: emptyToUndefined(values.min_supported_version ?? ""),
    min_supported_version_ios: emptyToUndefined(
      values.min_supported_version_ios ?? "",
    ),
    add_more: values.terms,
    add_policy: values.policies,
    add_media: values.social,
  };
}

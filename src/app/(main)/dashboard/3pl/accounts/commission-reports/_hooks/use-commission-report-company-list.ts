"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchCompanyData } from "../_api/get-company-api";

export function useCommissionReportCompanyList() {
  return useQuery({
    queryKey: ["3pl-companies-commission-report"],
    queryFn: fetchCompanyData,
    select: (data) =>
      data.map((company) => ({
        label: company.name,
        value: String(company.id),
      })),
  });
}

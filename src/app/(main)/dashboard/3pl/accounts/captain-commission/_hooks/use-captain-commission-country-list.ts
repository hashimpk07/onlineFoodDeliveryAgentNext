"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchCountryData } from "../_api/get-captain-commission-country-api";

export function useCaptainCommissionCountryList() {
  return useQuery({
    queryKey: ["country"],
    queryFn: fetchCountryData,
    select: (data) =>
      data.map((country) => ({
        label: country.name,
        value: String(country.id),
      })),
  });
}

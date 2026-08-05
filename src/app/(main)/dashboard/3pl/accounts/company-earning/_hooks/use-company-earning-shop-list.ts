"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchShopData } from "../_api/get-company-earning-shop-api";

export function useCompanyEarningShopList(clientId?: string | null) {
  return useQuery({
    queryKey: ["shops", clientId],
    queryFn: fetchShopData,
    select: (data) => {
      let filteredData = data;
      if (clientId) {
        filteredData = data.filter(
          (shop) => String(shop.client_id) === clientId,
        );
      }
      return filteredData.map((shop) => ({
        label: shop.name,
        value: String(shop.id),
      }));
    },
  });
}

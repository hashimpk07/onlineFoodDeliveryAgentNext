import { api } from "@/lib/api.client";
import { ApiResponse } from "@/types/api";

export interface Shop {
  id: number;
  name: string;
}

export interface Client {
  id: number;
  name: string;
  shops?: Shop[];
}

export const getShops = async (): Promise<Shop[]> => {
  try {
    const response = await api.get<ApiResponse<Client[]>>("/public/clients");

    if (response.status === "success" && Array.isArray(response.data)) {
      const shopsMap = new Map<string, Shop>();
      response.data.forEach((client) => {
        if (Array.isArray(client.shops)) {
          client.shops.forEach((shop) => {
            if (shop.name) {
              shopsMap.set(shop.name, {
                id: shop.id,
                name: shop.name,
              });
            }
          });
        }
      });
      return Array.from(shopsMap.values());
    }

    return [];
  } catch (error) {
    console.error("Fetch shops error:", error);
    return [];
  }
};

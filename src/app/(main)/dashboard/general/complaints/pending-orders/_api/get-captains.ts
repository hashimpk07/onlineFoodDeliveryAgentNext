import { api } from "@/lib/api.client";

import { Captain, CaptainResponse } from "../_types";

export const getCaptains = async (): Promise<Captain[]> => {
  const response = await api.get<CaptainResponse>("/public/captains");

  const list = Array.isArray(response?.data) ? response.data : [];

  return list.map((item) => ({
    id: item.id,
    name: item.firstname,
  }));
};

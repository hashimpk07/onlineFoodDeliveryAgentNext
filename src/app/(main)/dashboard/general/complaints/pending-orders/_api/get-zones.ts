import { api } from "@/lib/api.client";

import { Zone, ZoneNode, ZoneResponse } from "../_types";

const flattenZones = (nodes: ZoneNode[]): Zone[] => {
  return nodes.flatMap((node) => [
    {
      id: node.id,
      name: node.label,
    },
    ...(node.children ? flattenZones(node.children) : []),
  ]);
};

export const getZones = async (): Promise<Zone[]> => {
  const response = await api.get<ZoneResponse>("/public/zone-based");

  const list = Array.isArray(response?.data) ? response.data : [];

  const flattenedZones = flattenZones(list);

  // Remove duplicate IDs
  const uniqueZones = Array.from(
    new Map(
      flattenedZones.map((zone) => [`${zone.id}-${zone.name}`, zone]),
    ).values(),
  );

  return uniqueZones;
};

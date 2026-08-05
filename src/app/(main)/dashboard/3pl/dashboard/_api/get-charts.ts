"use server";
import { CaptainsChartResponse } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_types/api";
import { api } from "@/lib/api.client";

const GRAPH_ENDPOINTS = {
  shiftStatus: "ThirdPartyCaptainShiftStatus",
  activeInactive: "ThirdPartyCaptainActiveInactive",
  byRegion: "ThirdPartyActiveCaptainByRegion",
  byVehicle: "ThirdPartyActiveCaptainByVehicleType",
  onlineCount: "ThirdPartyActiveCaptain",
} as const;

async function fetch3plGraph(
  endpoint: string,
  company_id_3pl?: string | number,
  from_date?: string,
  to_date?: string,
): Promise<CaptainsChartResponse> {
  const today = new Date().toISOString().split("T")[0];

  return await api.get(`/3pl/graphs/${endpoint}`, {
    params: {
      company_id_3pl,
      from_date: from_date ?? today,
      to_date: to_date ?? today,
    },
  });
}

export const getCaptainShiftStatus = async (
  company_id_3pl?: string | number,
  from_date?: string,
  to_date?: string,
) =>
  fetch3plGraph(
    GRAPH_ENDPOINTS.shiftStatus,
    company_id_3pl,
    from_date,
    to_date,
  );

export const getCaptainActiveInactive = async (
  company_id_3pl?: string | number,
  from_date?: string,
  to_date?: string,
) =>
  fetch3plGraph(
    GRAPH_ENDPOINTS.activeInactive,
    company_id_3pl,
    from_date,
    to_date,
  );

export const getCaptainByRegion = async (
  company_id_3pl?: string | number,
  from_date?: string,
  to_date?: string,
) =>
  fetch3plGraph(GRAPH_ENDPOINTS.byRegion, company_id_3pl, from_date, to_date);

export const getCaptainByVehicle = async (
  company_id_3pl?: string | number,
  from_date?: string,
  to_date?: string,
) =>
  fetch3plGraph(GRAPH_ENDPOINTS.byVehicle, company_id_3pl, from_date, to_date);

export const getOnlineCaptainOrderCount = async (
  company_id_3pl?: string | number,
  from_date?: string,
  to_date?: string,
) =>
  fetch3plGraph(
    GRAPH_ENDPOINTS.onlineCount,
    company_id_3pl,
    from_date,
    to_date,
  );

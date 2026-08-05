"use server";
import {
  BaseSelect,
  Vehicle,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_types/api";
import {
  AreaFilter,
  Country,
  FilterVehicleType,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/api";
import { api } from "@/lib/api.client";
import { unwrapResponse } from "@/lib/unwrap-response";
import { ApiResponse } from "@/types/api";

export async function getCountries(): Promise<Country[]> {
  return api
    .get<ApiResponse<Country[]>>("/public/countries")
    .then(unwrapResponse);
}

export async function getVehicleTypes(): Promise<FilterVehicleType[]> {
  return api
    .get<ApiResponse<FilterVehicleType[]>>("/public/vehicle-types")
    .then(unwrapResponse);
}

export async function getAreas(): Promise<AreaFilter[]> {
  return api
    .get<ApiResponse<AreaFilter[]>>("/public/areas")
    .then(unwrapResponse);
}

export async function getCommissionRules(): Promise<BaseSelect[]> {
  return api
    .get<ApiResponse<BaseSelect[]>>("/public/commission/rules")
    .then(unwrapResponse);
}

export async function getAutoassignPriority(): Promise<BaseSelect[]> {
  return api
    .get<ApiResponse<BaseSelect[]>>("/public/autoassign/priority")
    .then(unwrapResponse);
}

export async function getAssets(): Promise<BaseSelect[]> {
  return api
    .get<ApiResponse<BaseSelect[]>>("/public/assets")
    .then(unwrapResponse);
}

export async function getVehicles(
  companyId?: number,
  vehicle_type?: number,
  isEdit?: boolean,
): Promise<Vehicle[]> {
  const params = {
    vehicle_type,
    ...(isEdit && { assigned: false }),
  };

  return api
    .get<ApiResponse<Vehicle[]>>(`/3pl/vehicle-list/${companyId}`, {
      params,
    })
    .then(unwrapResponse);
}

export async function getEmploymentType(): Promise<BaseSelect[]> {
  return api
    .get<ApiResponse<BaseSelect[]>>("/3pl/employement-type")
    .then(unwrapResponse);
}

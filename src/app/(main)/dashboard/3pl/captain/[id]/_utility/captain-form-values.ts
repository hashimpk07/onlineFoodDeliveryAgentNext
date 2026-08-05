/* eslint-disable */

"use client";

import { CaptainDetails } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_types/api";

/**
 * Converts API date format to input date format (yyyy-mm-dd)
 * API returns: "2026-01-29T21:00:00.000000Z"
 * Form needs: "2026-01-29"
 */
export function toInputDate(dateStr: string | null | undefined): string {
  if (!dateStr) return new Date().toISOString().split("T")[0];

  // If already in yyyy-mm-dd format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }

  // Handle ISO format (what API actually returns)
  if (dateStr.includes("T")) {
    return dateStr.split("T")[0];
  }

  // If in dd-mm-yyyy format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  }

  // Try to parse as ISO date
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0];
    }
  } catch (e) {
    console.warn("Failed to parse date:", dateStr);
  }

  return new Date().toISOString().split("T")[0];
}

/**
 * Safely parse JSON string, returns default value on error
 * API returns: "[\"4\"]" for type_of_vehicle
 */
function safeJsonParse(
  jsonStr: string | null | undefined,
  defaultValue: any = [],
): any {
  if (!jsonStr) return defaultValue;

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.warn("Failed to parse JSON:", jsonStr);
    return defaultValue;
  }
}

/**
 * Maps CaptainDetails API response to form values
 * Based on actual API response structure
 */
export function mapCaptainToFormValues(data: any) {
  return {
    // Basic Information
    firstname: data?.firstname ?? "",
    phone_number: data?.phone_number ?? "",

    // Iqama Details
    iqama_number: data?.iqama_number ?? "",
    iqama_expiry_date: toInputDate(data?.iqama_expiry_date),

    // License Details
    licence_number: data?.licence_number ?? "",
    licence_expiry_date: toInputDate(data?.licence_expiry_date),

    // Nationality - API returns: nationality_id: 153
    nationality: data?.nationality_id ? String(data.nationality_id) : "",

    // Employment Type - API returns: captain_employment_type_id: 4
    employment_type: data?.captain_employment_type_id
      ? String(data.captain_employment_type_id)
      : "",

    // Regions - API returns: [{"id":73,"name":"NORTH BURAIDAH","pivot":{...}}]
    regions: Array.isArray(data?.regions)
      ? data.regions.map((r: any) => String(r.id))
      : [],

    // Dates
    date_of_joining: toInputDate(data?.date_of_joining),
    rent_valid_from: toInputDate(data?.rent_valid_from),

    // Status - API returns: "Active" or "Request"
    status: data?.status ?? "Request",

    // Vehicle Type - API returns: "[\"4\"]" as string
    type_of_vehicle: safeJsonParse(data?.type_of_vehicle, []),

    // Vehicle - not present in current API response
    vehicle: data?.vehicle_id ? String(data.vehicle_id) : "",

    // Financial Details
    given_custodyamount: data?.given_custodyamount
      ? String(data.given_custodyamount)
      : "",
    monthly_salary: data?.monthly_salary ? String(data.monthly_salary) : "",
    daily_rent: data?.daily_rent ? String(data.daily_rent) : "",

    // Commission Rule - API returns: commission_rule_id: 22
    commission_rule_id: data?.commission_rule_id
      ? String(data.commission_rule_id)
      : "",

    // Auto Assign Priority - API returns: auto_assign_priority_id: 1
    auto_assign_priority: data?.auto_assign_priority_id
      ? String(data.auto_assign_priority_id)
      : "",

    // User Email - API returns: user: { email: "..." }
    email: data?.user?.email ?? "",

    // Security - Always empty for edit mode
    password: "",
    password_confirmation: "",

    // Assets - API returns: asset: [] (empty array in your case)
    asset_category:
      Array.isArray(data?.asset) && data.asset.length > 0
        ? data.asset.map((a: any) => a.category ?? "")
        : [""],
    asset:
      Array.isArray(data?.asset) && data.asset.length > 0
        ? data.asset.map((a: any) => a.reference_number ?? "")
        : [""],

    // Files - Always reset on edit (user must re-upload)
    iqama: [],
    licence: [],
    vehicle_images: [],
    upload_agreement_copy: [],
  };
}

/**
 * Returns default form values for create mode
 */
export function getDefaultFormValues() {
  const today = new Date().toISOString().split("T")[0];

  return {
    firstname: "",
    phone_number: "",
    email: "",
    iqama_number: "",
    iqama_expiry_date: today,
    licence_number: "",
    licence_expiry_date: today,
    nationality: "",
    employment_type: "",
    regions: [],
    auto_assign_priority: "",
    date_of_joining: today,
    rent_valid_from: today,
    status: "Request",
    type_of_vehicle: [],
    vehicle: "",
    given_custodyamount: "",
    monthly_salary: "",
    daily_rent: "",
    commission_rule_id: "",
    asset_category: [""],
    asset: [""],
    password: "",
    password_confirmation: "",
    iqama: [],
    licence: [],
    vehicle_images: [],
    upload_agreement_copy: [],
  };
}

/**
 * Type guard to check if captain data is valid
 */
export function isValidCaptainData(data: any): data is CaptainDetails {
  return (
    data &&
    typeof data === "object" &&
    "id" in data &&
    ("firstname" in data || "name" in data)
  );
}

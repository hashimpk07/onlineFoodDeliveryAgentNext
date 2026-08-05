import { Pagination } from "@/types/api";

// Single day report entry (dynamic date keys like "01-Feb")
export interface CaptainWorkingDayEntry {
  working_h: string; // can be "Nil" or actual hours
  o_count: string; // can be "Nil" or actual count
}

// Captain report item
export interface CaptainWorkingDayReport {
  id: number;
  captain_id: number;
  captain_name: string;
  iqama_no: string;
  regions: string[];
  date: Record<string, CaptainWorkingDayEntry>;
}

// Data wrapper
export interface CaptainWorkingDayResponse {
  reports: CaptainWorkingDayReport[];
  pagination: Pagination;
}

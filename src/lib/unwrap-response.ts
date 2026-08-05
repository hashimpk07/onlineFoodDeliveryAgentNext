import { ApiResponse } from "@/types/api";

export function unwrapResponse<T>(res: ApiResponse<T>): T {
  if (res.status === "error" || res.data == null) {
    console.error("API response error:", res);
    throw new Error(res.message || "API request failed");
  }

  return res.data;
}

"use server";

import axiosInstance from "@/lib/axios";

export async function submitExportRequest(
  url: string,
  method: "GET" | "POST",
  payload: any,
) {
  try {
    let response;
    if (method === "GET") {
      response = await axiosInstance.get(url, {
        params: payload,
      });
    } else {
      response = await axiosInstance.post(url, payload);
    }
    return response.data;
  } catch (error: any) {
    // If it's an axios error, we want to return a serializable object
    // to the client, not the full error object which might contain circular references
    if (error.response) {
      return {
        status: "error",
        message:
          error.response.data?.message ?? `API Error: ${error.response.status}`,
      };
    }
    return {
      status: "error",
      message: error.message ?? "Unknown error occurred",
    };
  }
}

"use server";

import { api } from "@/lib/api.client";

export async function createVehicleApi(formData: FormData) {
  try {
    const response = await api.post("/3pl/vehicles", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      status: "error",
      message: error.message ?? "Failed to create vehicle",
    };
  }
}

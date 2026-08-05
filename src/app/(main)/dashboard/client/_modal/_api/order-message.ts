"use server";

import { api } from "@/lib/api.client";

import type { ApiResponse, TicketMessage } from "../_type/chatbox";

export const sendOrderMessage = async (
  orderId: string,
  payload: { message: string },
): Promise<ApiResponse<TicketMessage>> => {
  try {
    return await api.post(`/public/complaint/${orderId}/message`, payload);
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      status: "error",
      message: error.message ?? "An unexpected error occurred",
      data: {} as TicketMessage,
    };
  }
};

export const getOrderMessages = async (
  orderId: string,
): Promise<ApiResponse<TicketMessage[]>> => {
  try {
    const responseData = await api.get<ApiResponse<TicketMessage[]>>(
      `/public/complaint/${orderId}/messages`,
    );
    if (
      (typeof responseData.status === "string" &&
        responseData.status === "error") ||
      !responseData.data
    ) {
      throw new Error(
        responseData.message ?? "Failed to fetch order orders data",
      );
    }
    return {
      status: responseData.status,
      message: responseData.message ?? "",
      data: responseData.data,
    };
  } catch (error) {
    console.error("Order list :", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unexpected error occurred",
      data: [],
    };
  }
};

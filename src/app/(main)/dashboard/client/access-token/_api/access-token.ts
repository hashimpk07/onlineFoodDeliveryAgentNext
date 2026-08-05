"use server";

import {
  AccessTokenCreateResponse,
  AccessTokenResponse,
} from "@/app/[locale]/(main)/dashboard/client/access-token/_types/access-token-types";
import { ApiResponse } from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { api } from "@/lib/api.client";

export async function AccessConfigData(): Promise<
  ApiResponse<AccessTokenResponse>
> {
  try {
    const responseData =
      await api.get<ApiResponse<AccessTokenResponse>>(`client/access-tokens`);
    if (
      (typeof responseData.status === "string" &&
        responseData.status === "error") ||
      !responseData.data
    ) {
      throw new Error(
        responseData.message || "Failed to fetch order orders data",
      );
    }

    return {
      status: responseData.status,
      message: responseData.message,
      data: responseData.data,
    };
  } catch (error) {
    console.error("Order list :", error);

    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unexpected error occurred",
    };
  }
}

export async function AccessTokenCreate(
  name: string,
): Promise<ApiResponse<AccessTokenCreateResponse>> {
  try {
    const response = await api.post<ApiResponse<AccessTokenCreateResponse>>(
      "/client/access-token/create",
      { api_key_name: name },
    );

    if (response.status === "error" || !response.data) {
      throw new Error(response.message || "Failed to create access token");
    }
    return response;
  } catch (error) {
    console.error("Access token create failed:", error);
    throw error;
  }
}

export async function AccessTokenRevoke(
  id: number | string,
): Promise<ApiResponse<null>> {
  const response = await api.delete<ApiResponse<null>>(
    `/client/access-token/revoke/${id}`,
  );

  if (!response) {
    throw new Error("Empty response from revoke API");
  }

  if (response.status === "error") {
    throw new Error(response.message);
  }

  return response;
}

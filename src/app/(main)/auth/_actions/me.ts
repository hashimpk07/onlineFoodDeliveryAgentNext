"use server";

import { api } from "@/lib/api.client";
import { axios } from "@/lib/axios";
import { getSession } from "@/lib/session";
import { UserSchema, type User } from "@/stores/user";

interface MeResponse {
  status: "success" | "error";
  message: string;
  data?: {
    user: {
      id: number;
      name: string;
      email: string;
      role_id: number;
      role: {
        id: number;
        name: string;
        display_name: string;
      };
      employee3pl?: {
        third_party_logistic_company_id: number;
      };
      employee_client?: {
        id: number;
      }[];
    };
    permissions?: string[];
  };
}

type MeActionResult = { success: true; user: User } | { error: string };

async function fetchUserData(token: string) {
  // const response = await axiosInstance.get<MeResponse>(
  //   "https://sandbox.4ulogistic.com/api/public/user",
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       Accept: "application/json",
  //     },
  //   },
  // );

  const responseData = await api.get<MeResponse>("/public/user");
  // console.log("Me action response data:", responseData);
  if (responseData.status === "error" || !responseData.data) {
    throw new Error(responseData.message || "Failed to fetch user data");
  }

  return responseData;
}

function transformUserData(
  userData: NonNullable<MeResponse["data"]>["user"],
  permissions: string[],
): User {
  return UserSchema.parse({
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role.name,
    avatar: undefined,
    permissions,
    third_party_logistic_company_id:
      userData.employee3pl?.third_party_logistic_company_id,
    employee_client_id: userData.employee_client?.[0]?.id,
  });
}

export async function meAction(): Promise<MeActionResult> {
  try {
    const session = await getSession();
    // console.log("Me action session:", session);
    if (!session?.token) {
      return { error: "No active session" };
    }

    const response = await fetchUserData(session.token);
    if (!response.data) {
      return { error: "Invalid response data" };
    }

    // Extract permissions from the response (at root level)
    const permissions = response.data.permissions ?? [];
    const validatedUser = transformUserData(response.data.user, permissions);

    return { success: true, user: validatedUser };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message ?? "Network error" };
    }
    return { error: "Failed to fetch user data" };
  }
}

"use server";

import { LaravelLoginResponse } from "@/app/[locale]/(main)/auth/_types";
import { api } from "@/lib/api.client";
import { extractUserData, formatSession, validateLoginInput } from "@/lib/auth";
import { axios } from "@/lib/axios";
import { createSession } from "@/lib/session";

export async function loginAction(email: string, password: string) {
  try {
    const validated = await validateLoginInput(email, password);

    const response = await api.post<LaravelLoginResponse>(
      "/public/login",
      validated,
    );

    const { user, token } = await extractUserData(response);
    const sessionPayload = await formatSession(user, token);

    await createSession(sessionPayload);

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
      },
    };
  } catch (error: unknown) {
    console.error("Login error:", error);

    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.errors ?? "Network error" };
    }

    return { error: "Unexpected error occurred" };
  }
}

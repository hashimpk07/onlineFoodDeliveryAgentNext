"use server";

import { redirect } from "next/navigation";

import { api } from "@/lib/api.client";
import axiosInstance from "@/lib/axios";
import { deleteSession, getSession } from "@/lib/session";

async function callBackendLogout(token: string) {
  try {
    // await axiosInstance.post(
    //   "https://sandbox.4ulogistic.com/api/public/logout",
    //   {},
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   },
    // );
    await api.post("public/logout");
  } catch (error) {
    console.error("Backend logout error:", error);
  }
}

export async function logoutAction() {
  const session = await getSession();

  if (session?.token) {
    await callBackendLogout(session.token);
  }

  await deleteSession();
  redirect("/auth/login");
}

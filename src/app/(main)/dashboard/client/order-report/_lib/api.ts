// import { mapQueryToApiParams } from "@/app/[locale]/(main)/dashboard/client/order-report/_utils/order-report-utils";
import axiosInstance from "@/lib/axios";

import { mapQueryToApiParams } from "../_utils/order-report-utils";

export async function fetchOrderStatusData() {
  const res = await axiosInstance.get("/api/public/order-status");
  return res.data.data;
}
export async function fetchCaptainData() {
  const res = await axiosInstance.get("/api/public/captains");
  return res.data.data;
}

export async function fetchOrderReportsData(query: Record<string, any>) {
  const params = mapQueryToApiParams(query);
  const res = await axiosInstance.get("/api/client/orders_list/report", {
    params,
  });

  return res.data.data.reports;
}

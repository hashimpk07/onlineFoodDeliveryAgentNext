// "use server";

// import { api } from "@/lib/api.client";

// export async function cancelOrder(payload: {
//   orderId: string;
//   status_id: number;
//   note: string;
//   from_client: number;
//   reason_id: number;
// }) {
//   return api.post(`/public/orders/update-status/${payload.orderId}`, payload);
// }

"use server";

import { api } from "@/lib/api.client";

import type { ApiResponse } from "../_type/chatbox";

export type CancelOrderPayload = {
  orderId: string;
  status_id: number;
  note: string;
  from_client: number;
  reason_id: number;
};

export async function cancelOrder(
  payload: CancelOrderPayload,
): Promise<ApiResponse<null>> {
  return api.post<ApiResponse<null>>(
    `/public/orders/update-status/${payload.orderId}`,
    payload,
  );
}

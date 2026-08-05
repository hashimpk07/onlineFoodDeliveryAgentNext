import { UseMutateAsyncFunction } from "@tanstack/react-query";

import { CancelOrderPayload } from "@/app/[locale]/(main)/dashboard/client/_modal/_api/order-update";

export interface CancellationReason {
  id: number;
  reason: string;
  reason_ar: string;
  is_caused_by_4u: number;
  data: string;
  message: string;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T | null;
}

export type Option = {
  value: number;
  label: string;
};

export type UpdateModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  orderId: string | null;
  title: string;
  subtitle: string;
  button_name: string;
  options: Option[];
  cancelOrder: UseMutateAsyncFunction<
    unknown,
    Error,
    CancelOrderPayload,
    unknown
  >;
  cancellingOrder: boolean;
};

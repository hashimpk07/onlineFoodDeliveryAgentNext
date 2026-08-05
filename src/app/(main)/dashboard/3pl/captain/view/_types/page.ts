import {
  OrderLog,
  ShiftLog,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_types/api";

export type ShiftActionCallback = (shift: ShiftLog) => void;

export type OrderActionCallback = (order: OrderLog) => void;

export type SelectedPayment = {
  payment_id: string | null;
  amount: string | null;
  order_amount: string | null;
} | null;

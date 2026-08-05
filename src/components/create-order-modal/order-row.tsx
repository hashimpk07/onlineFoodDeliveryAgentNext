import React from "react";

import { Copy, Trash2 } from "lucide-react";
import { UseFormReturn, useWatch } from "react-hook-form";

import { ORDERTYPES } from "@/components/create-order-modal/types";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSlotEndMinutes } from "@/lib/date";

import { CreateOrderFormValues } from "./schema";

interface OrderRowProps {
  index: number;
  form: UseFormReturn<CreateOrderFormValues>;
  remove: (index: number) => void;
  append: (value: any) => void;
  onCopy: (index: number) => void;

  isSingleRow: boolean;
  shouldHideFields: boolean;
  shopOrderType: string;
  timeSlots: {
    id: number;
    start_time: string;
    end_time: string;
    close_before: string | null;
    name: string;
  }[];
  requireDeliveryLocation?: boolean;
}

const paymentMethodOptions = [
  { value: "1", label: "Prepaid" },
  { value: "2", label: "Cash" },
  { value: "3", label: "Swiping Machine" },
];

export function OrderRow({
  index,
  form,
  remove,
  append,
  onCopy,
  isSingleRow,
  shouldHideFields,
  shopOrderType,
  timeSlots,
  requireDeliveryLocation,
}: OrderRowProps) {
  const paymentMethod = useWatch({
    control: form.control,
    name: `orders.${index}.payment_method`,
  });

  const selectedDeliveryTypeId = useWatch({
    control: form.control,
    name: `orders.${index}.order_type`,
  });

  const defaultValue = paymentMethodOptions[0].value;
  const shouldDisableFields = selectedDeliveryTypeId === "1";
  const disableAmount = (paymentMethod ?? defaultValue) === "1";

  const nowMinutes = React.useMemo(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="group relative rounded-xl border bg-card p-4 pt-9 shadow-sm transition-colors hover:border-primary/30">
      <span className="absolute top-3 left-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
        {index + 1}
      </span>

      <div className="absolute top-2 right-2 flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-primary"
          onClick={() => onCopy(index)}
          title="Duplicate order"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          onClick={() => remove(index)}
          hidden={isSingleRow}
          title="Remove order"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid auto-cols-fr grid-flow-col items-start gap-3">
        <FormField
          control={form.control}
          name={`orders.${index}.order_id`}
          render={({ field }) => (
            <FormItem className="min-w-0">
              <FormLabel>Order ID *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!shouldHideFields && (
          <FormField
            control={form.control}
            name={`orders.${index}.order_type`}
            render={({ field }) => (
              <FormItem className="min-w-0">
                <FormLabel>Order Type *</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ORDERTYPES.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!shouldHideFields && !shouldDisableFields && (
          <FormField
            control={form.control}
            name={`orders.${index}.order_date`}
            render={({ field }) => (
              <FormItem className="min-w-0">
                <FormLabel>Order Date</FormLabel>
                <DatePicker
                  date={field.value ?? undefined}
                  onChange={field.onChange}
                  disabled={{ before: today }}
                  preventOpen={shouldDisableFields}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!shouldHideFields && !shouldDisableFields && (
          <FormField
            control={form.control}
            name={`orders.${index}.delivery_time`}
            render={({ field }) => (
              <FormItem className="min-w-0">
                <FormLabel>Delivery Time *</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots
                      .filter(
                        (slot) => getSlotEndMinutes(slot.name) > nowMinutes,
                      )
                      .map((slot) => (
                        <SelectItem key={slot.id} value={String(slot.id)}>
                          {slot.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name={`orders.${index}.mobile`}
          render={({ field }) => (
            <FormItem className="min-w-0">
              <FormLabel>Mobile *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`orders.${index}.payment_method`}
          render={({ field }) => (
            <FormItem className="min-w-0">
              <FormLabel>Payment Method</FormLabel>
              <Select
                value={field.value ?? paymentMethodOptions[0].value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentMethodOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`orders.${index}.bill_amount`}
          render={({ field }) => (
            <FormItem className="min-w-0">
              <FormLabel>Bill Amount *</FormLabel>
              <FormControl>
                <Input type="number" {...field} disabled={disableAmount} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`orders.${index}.delivery_address`}
          render={({ field }) => (
            <FormItem className="min-w-0">
              <FormLabel>
                Delivery Address{requireDeliveryLocation ? " *" : ""}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

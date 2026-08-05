/* eslint-disable complexity */
"use client";

import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { useCreateCaptainCommissionPayment } from "@/app/[locale]/(main)/dashboard/3pl/accounts/captain-commission/captain-commission-details/_hooks/use-create-captain-commission-payment";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { fromApiDate, toApiDate } from "@/lib/date";

import type { CaptainCommissionDetailsCounts } from "../_types/captain-commission-details-type";

const paymentSchema = z.object({
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  now_paying: z.coerce.number().min(0, "Amount must be at least 0"),
  payment_mode: z.enum(["Bank", "Cash"], {
    required_error: "Payment mode is required",
  }),
  reference_no: z.string().optional(),
  attachments: z.array(z.any()).optional(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface CaptainCommissionPaymentModalProps {
  open: boolean;
  onClose: () => void;
  counts?: CaptainCommissionDetailsCounts | null;
  captainId?: string;
  initialFromDate?: string;
  initialToDate?: string;
}

export function CaptainCommissionPaymentModal({
  open,
  onClose,
  counts,
  captainId,
  initialFromDate,
  initialToDate,
}: CaptainCommissionPaymentModalProps) {
  const totalPayable = useMemo(() => {
    return Number(
      String(counts?.total_payable_commission ?? "0").replace(/,/g, ""),
    );
  }, [counts]);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      date_from: initialFromDate,
      date_to: initialToDate,
      now_paying: totalPayable,
      payment_mode: "Bank",
      reference_no: "",
      attachments: [],
    },
  });

  const { control, handleSubmit, reset, setValue, formState } = form;
  const nowPaying = useWatch({ control, name: "now_paying" }) || 0;
  const balance = Math.max(0, totalPayable - nowPaying);
  const dateFrom = useWatch({ control, name: "date_from" });
  const dateTo = useWatch({ control, name: "date_to" });

  useEffect(() => {
    if (open) {
      reset({
        date_from: initialFromDate,
        date_to: initialToDate,
        now_paying: totalPayable,
        payment_mode: "Bank",
        reference_no: "",
        attachments: [],
      });
    }
  }, [open, totalPayable, initialFromDate, initialToDate, reset]);

  const mutation = useCreateCaptainCommissionPayment(captainId ?? "");

  const onSubmit = async (data: PaymentFormValues) => {
    if (!captainId) return;
    if (data.now_paying > totalPayable) {
      form.setError("now_paying", {
        message: "Paying amount cannot exceed payable commission",
      });
      return;
    }

    const formData = new FormData();
    formData.append("transferred", "1");
    formData.append("payment_mode", data.payment_mode === "Bank" ? "1" : "2");
    formData.append("reference_no", data.reference_no ?? "");
    formData.append("date_from", data.date_from ?? "");
    formData.append("date_to", data.date_to ?? "");
    formData.append("orders_count", String(counts?.attended_orders ?? 0));
    if (data.attachments?.length) {
      data.attachments.forEach((file: File) => {
        formData.append("attachments[]", file);
      });
    }
    mutation.mutate(formData, { onSuccess: () => onClose() });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold uppercase tracking-wider">
            Make Payment
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-0"
          >
            <div className="px-6 py-5 space-y-4">
              {/* Summary section */}
              <div className="rounded-xl overflow-hidden border">
                <div className="bg-[#1e4d5e] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white">
                    Payment Summary
                  </p>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Orders Count</FormLabel>
                    <Input value={counts?.attended_orders ?? 0} disabled />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Total Payable Amount</FormLabel>
                    <Input value={totalPayable.toFixed(2)} disabled />
                  </FormItem>

                  <FormField
                    control={control}
                    name="now_paying"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Now Paying</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Balance</FormLabel>
                    <Input value={balance.toFixed(2)} disabled />
                  </FormItem>
                </div>
              </div>

              {/* Payment details section */}
              <div className="rounded-xl overflow-hidden border">
                <div className="bg-[#1e4d5e] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white">
                    Payment Details
                  </p>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4">
                  <FormItem className="col-span-2">
                    <FormLabel>Date Range</FormLabel>
                    <DateRangePicker
                      from={fromApiDate(dateFrom)}
                      to={fromApiDate(dateTo)}
                      onChange={(from, to) => {
                        setValue("date_from", toApiDate(from) ?? undefined, {
                          shouldValidate: true,
                        });
                        setValue("date_to", toApiDate(to) ?? undefined, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    {formState.errors.date_from && (
                      <p className="text-sm font-medium text-destructive">
                        {formState.errors.date_from.message}
                      </p>
                    )}
                    {formState.errors.date_to && (
                      <p className="text-sm font-medium text-destructive">
                        {formState.errors.date_to.message}
                      </p>
                    )}
                  </FormItem>

                  <FormField
                    control={control}
                    name="payment_mode"
                    render={({ field }) => (
                      <FormItem>
                        <SearchableSelect
                          label="Payment Mode"
                          value={field.value}
                          placeholder="Select mode"
                          options={[
                            { id: "Bank", label: "Bank" },
                            { id: "Cash", label: "Cash" },
                          ]}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="reference_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference No</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter reference number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Attachments */}
              <div className="rounded-xl overflow-hidden border">
                <div className="bg-[#1e4d5e] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white">
                    Attachments
                  </p>
                </div>
                <div className="p-4">
                  <FormField
                    control={control}
                    name="attachments"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FileUpload
                            multiple
                            files={field.value}
                            onFilesChange={(files) => field.onChange(files)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="px-6 pb-6 border-t pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Processing..." : "Submit Payment"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

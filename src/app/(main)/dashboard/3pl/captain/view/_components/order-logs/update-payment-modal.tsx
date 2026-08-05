"use client";
import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

const formSchema = z
  .object({
    amount: z.string().min(1, "Amount is required"),
    order_amount: z.string().min(1, "Order amount is required"),
    payment_method: z.enum(["By Cash", "By POS", "Both"], {
      required_error: "Please select a payment mode",
    }),
    cash: z.string().optional(),
    bank: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.payment_method === "Both") {
      const cashAmount = Number(data.cash ?? 0);
      const bankAmount = Number(data.bank ?? 0);
      const orderAmount = Number(data.order_amount);

      if (!data.cash || data.cash === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cash amount is required when payment mode is Both",
          path: ["cash"],
        });
      }
      if (!data.bank || data.bank === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bank amount is required when payment mode is Both",
          path: ["bank"],
        });
      }
      if (cashAmount + bankAmount !== orderAmount) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Total amount of cash & bank must be equal to order amount",
          path: ["cash"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Total amount of cash & bank must be equal to order amount",
          path: ["bank"],
        });
      }
    }
  });

type FormValues = z.infer<typeof formSchema>;

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (data: FormValues) => Promise<void>;
  isLoading?: boolean;
  paymentData?: {
    payment_id: string;
    amount: string;
    order_amount: string;
  } | null;
};

export default function UpdatePaymentModal({
  isOpen,
  closeModal,
  onSubmit,
  isLoading = false,
  paymentData,
}: ModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      order_amount: "",
      payment_method: undefined,
      cash: "",
      bank: "",
    },
  });

  const paymentMethod = form.watch("payment_method");

  useEffect(() => {
    if (paymentData && isOpen) {
      form.reset({
        amount: paymentData.amount ?? "",
        order_amount: paymentData.order_amount ?? "",
        payment_method: undefined,
        cash: "",
        bank: "",
      });
    }
  }, [paymentData, isOpen, form]);

  const handleClose = () => {
    if (!isLoading) {
      form.reset();
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold uppercase tracking-wider">
            Update Order Payment Details
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-0"
          >
            <div className="px-6 py-5 space-y-4">
              {/* Payment info section */}
              <div className="rounded-xl overflow-hidden border">
                <div className="bg-[#1e4d5e] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white">
                    Payment Details
                  </p>
                </div>
                <div className="p-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Amount"
                            disabled
                            readOnly
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="payment_method"
                    render={({ field }) => (
                      <FormItem>
                        <SearchableSelect
                          label="Payment Mode"
                          value={field.value}
                          placeholder="Select payment mode"
                          options={[
                            { id: "By Cash", label: "By Cash" },
                            { id: "By POS", label: "By POS" },
                            { id: "Both", label: "Both" },
                          ]}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Split payment section */}
              {paymentMethod === "Both" && (
                <div className="rounded-xl overflow-hidden border">
                  <div className="bg-[#1e4d5e] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white">
                      Split Amount
                    </p>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cash"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cash</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Cash amount"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bank"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Bank amount"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="px-6 pb-6 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

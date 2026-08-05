"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SearchableSelect } from "@/components/ui/searchable-select";

import {
  useCancelOrder,
  useCancellationReasons,
} from "../_hooks/use-cancellation-reasons";

import type { UpdateModalProps } from "../_type/order-cancellation";

export default function CancelOrderModal({
  isOpen,
  closeModal,
  orderId,
  title,
  subtitle,
  button_name,
}: UpdateModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: rawReasons, isLoading: isLoadingReasons } =
    useCancellationReasons();
  const { cancelOrder, cancellingOrder } = useCancelOrder(orderId ?? "");

  const options =
    rawReasons?.map((r) => ({
      label: r.reason,
      value: r.id,
    })) ?? [];

  const FormSchema = z.object({
    reason: z.string().min(1, {
      message: "Please select a cancellation reason",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reason: "",
    },
  });

  /** ------------------ RESET FORM ON OPEN ------------------ */
  useEffect(() => {
    if (isOpen) {
      form.reset({ reason: "" });
    }
  }, [isOpen, form]);

  /** ------------------ SUBMIT ------------------ */
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!orderId) return;

    try {
      setLoading(true);

      const selectedOption = options.find(
        (opt) => String(opt.value) === data.reason,
      );

      if (!selectedOption) {
        setError("Invalid reason selected");
        return;
      }

      await cancelOrder({
        orderId,
        status_id: 19,
        note: selectedOption.label,
        from_client: 1,
        reason_id: selectedOption.value,
      });
      closeModal();
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setError("");
          setLoading(false);
          closeModal();
        }
      }}
    >
      <DialogContent
        className="
    sm:max-w-[520px]
    p-0
    overflow-hidden
    bg-background
    gap-0
    [&>button]:hidden
  "
      >
        {/* ---------- HEADER ---------- */}
        <DialogHeader className="px-6 pt-6 pb-0">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>

            <div className="flex-1 space-y-1 pt-0.5">
              <DialogTitle className="text-lg font-semibold text-foreground">
                {title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {subtitle}
              </DialogDescription>
            </div>

            <DialogClose asChild>
              <button
                aria-label="Close"
                className="-mt-1 -mr-1 rounded-md p-1.5 text-muted-foreground
                  hover:bg-muted hover:text-foreground
                  focus:outline-none focus:ring-2
                  focus:ring-ring/40"
              >
                <X className="h-4 w-4" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        {/* ---------- BODY ---------- */}
        <div className="px-6 pt-5 pb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <SearchableSelect
                      label="Reason for cancellation"
                      value={field.value}
                      placeholder={
                        isLoadingReasons
                          ? "Loading reasons..."
                          : "Select a reason"
                      }
                      loading={isLoadingReasons}
                      options={options.map((opt) => ({
                        id: String(opt.value),
                        label: opt.label,
                      }))}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              {/* ---------- FOOTER ---------- */}
              <DialogFooter className="pt-1 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Go back
                </Button>

                <Button
                  type="submit"
                  variant="destructive"
                  disabled={cancellingOrder || loading || isLoadingReasons}
                >
                  {loading ? "Processing..." : button_name}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

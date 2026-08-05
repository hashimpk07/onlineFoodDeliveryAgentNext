"use client";
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

const formSchema = z
  .object({
    start_kilometer: z
      .string()
      .min(1, "Start kilometer is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: "Start kilometer must be a number greater than or equal to 0",
      }),
    end_kilometer: z
      .string()
      .min(1, "End kilometer is required")
      .refine((val) => !isNaN(Number(val)), {
        message: "End kilometer must be a number",
      }),
  })
  .refine(
    (data) => Number(data.end_kilometer) >= Number(data.start_kilometer),
    {
      message: "End kilometer must be greater than or equal to start kilometer",
      path: ["end_kilometer"],
    },
  );

type FormValues = z.infer<typeof formSchema>;

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (data: FormValues) => Promise<void>;
  isLoading?: boolean;
};

export default function UpdateVehicleKmModal({
  isOpen,
  closeModal,
  onSubmit,
  isLoading = false,
}: ModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { start_kilometer: "", end_kilometer: "" },
  });

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
          <DialogTitle className="text-lg font-semibold">
            Update Vehicle KM
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="px-6 py-5">
              <div className="rounded-xl overflow-hidden border">
                <div className="bg-[#1e4d5e] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white">
                    Kilometer Details
                  </p>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="start_kilometer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Kilometer</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter start KM"
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
                    name="end_kilometer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Kilometer</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter end KM"
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

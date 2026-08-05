/* eslint-disable max-lines */
"use client";

import { useEffect, useMemo, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { PackagePlus, Plus, Store } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { CreateOrderIndexedPayload } from "@/app/[locale]/(main)/dashboard/client/orders/_api/create-order";
import { BranchCheckboxDropdown } from "@/app/[locale]/(main)/dashboard/client/orders/_components/branch-checkbox-dropdown";
import { useCreateOrder } from "@/app/[locale]/(main)/dashboard/client/orders/_hooks/use-create-order";
import {
  Client,
  Shop,
  toArray,
} from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useUser } from "@/hooks/use-user";
import { toApiDate } from "@/lib/date";

import { OrderRow } from "./order-row";
import {
  CreateOrderFormValues,
  createOrderSchema,
  orderRowSchema,
} from "./schema";
import { ClientDetails } from "./types";

/* eslint-disable complexity */
export function CreateOrderModal({
  open,
  onOpenChange,
  shopsData = [],
  clientId,
  clientsDetails = [],
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients?: Client[];
  clientId: string | null;
  clientsDetails?: ClientDetails[];
  shopsData?: Shop[];
}) {
  const hasSingleClient = clientsDetails.length === 1;
  const { createOrder, creatingOrder, serverErrors, isSuccess } =
    useCreateOrder();

  const safeClients = useMemo(
    () => toArray<Shop>(shopsData as any),
    [shopsData],
  );
  const safeClientsDetails = useMemo(
    () => toArray<ClientDetails>(clientsDetails),
    [clientsDetails],
  );

  const { user } = useUser();
  // Derive the client ID for the logged-in employee.
  // user.employee_client_id IS the client ID — use it directly rather than
  // doing a list lookup that can fail if safeClientsDetails hasn't loaded yet.
  const loggedInClient = useMemo(() => {
    if (user?.employee_client_id) {
      return String(user.employee_client_id);
    }
    return null;
  }, [user]);

  const client_Id =
    loggedInClient ??
    (hasSingleClient && clientsDetails?.[0]?.id
      ? String(clientsDetails[0].id)
      : "");

  // console.log(
  //   "CreateOrderModal - client_Id:", client_Id,
  //   "| loggedInClient:", loggedInClient,
  //   "| user.employee_client_id:", user?.employee_client_id,
  //   "| clientsDetails[0].id:", clientsDetails?.[0]?.id,
  // );

  // Default values
  const defaultValues: Partial<CreateOrderFormValues> = {
    client_id: client_Id,
    shopname: "",
    orders: [
      {
        order_id: "",
        order_type: "1",
        order_date: null,
        delivery_time: "",
        mobile: "",
        payment_method: "1",
        bill_amount: "",
        delivery_address: "",
      },
    ],
  };

  const dynamicSchema = useMemo(() => {
    return createOrderSchema.superRefine((data, ctx) => {
      const selectedShop = safeClients.find(
        (c) => String(c.id) === data.shopname,
      );
      if (selectedShop?.require_delivery_location === 1) {
        data.orders.forEach((order, index) => {
          if (!order.delivery_address || order.delivery_address.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Delivery address is required",
              path: ["orders", index, "delivery_address"],
            });
          }
        });
      }
    });
  }, [safeClients]);

  const form = useForm<CreateOrderFormValues>({
    resolver: zodResolver(dynamicSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
      form.reset();
    }
  }, [isSuccess, onOpenChange, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "orders",
  });

  // Watchers
  const selectedShopId = form.watch("shopname");

  // Derived state
  const selectedShop = useMemo(() => {
    if (!selectedShopId) return null;
    return safeClients.find((c) => String(c.id) === selectedShopId) ?? null;
  }, [selectedShopId, safeClients]);

  const timeSlots = useMemo(() => {
    if (!Array.isArray(selectedShop?.time_slots)) {
      return [];
    }
    return selectedShop?.time_slots ?? [];
  }, [selectedShop]);

  const hasOrderTypeOne = useMemo(() => {
    return selectedShop?.delivery_types?.length === 1;
  }, [selectedShop]);

  const shopOrderType = useMemo(() => {
    if (!selectedShop) return "1";
    const dt = selectedShop.delivery_types?.[0];
    return dt ? String(dt.id) : "";
  }, [selectedShop]);

  const requireDeliveryLocation = selectedShop?.require_delivery_location === 1;

  const didResetRef = useRef(false);

  // Effects
  useEffect(() => {
    if (open && !didResetRef.current) {
      form.reset({
        ...defaultValues,
        client_id: clientId ?? client_Id ?? "",
      });

      didResetRef.current = true;
    }

    if (!open) {
      didResetRef.current = false;
    }
  }, [open, clientId, hasSingleClient, safeClientsDetails, form, client_Id]);

  // When user data loads asynchronously after the modal has already opened and
  // been reset with an empty client_id, patch just the client_id field so the
  // form reflects the correct resolved value without wiping other fields.
  useEffect(() => {
    if (!open || !client_Id) return;
    const current = form.getValues("client_id");
    if (!current) {
      form.setValue("client_id", client_Id, { shouldValidate: true });
    }
  }, [client_Id, open, form]);

  // Handle server errors
  useEffect(() => {
    if (serverErrors) {
      Object.entries(serverErrors).forEach(([key, messages]) => {
        const errorMessage = (messages as string[])?.[0];
        if (!errorMessage) return;

        const [field, indexStr] = key.split(".");
        const index = parseInt(indexStr);

        if (!isNaN(index)) {
          let fieldName: keyof z.infer<typeof orderRowSchema> | null = null;
          switch (field) {
            case "client_order_id":
              fieldName = "order_id";
              break;
            case "delivery_type":
              fieldName = "order_type";
              break;
            case "delivery_date":
              fieldName = "order_date";
              break;
            case "delivery_time":
              fieldName = "delivery_time";
              break;
            case "customer_number":
              fieldName = "mobile";
              break;
            case "delivery_payment_mode":
              fieldName = "payment_method";
              break;
            case "amount":
              fieldName = "bill_amount";
              break;
            case "address":
              fieldName = "delivery_address";
              break;
          }

          if (fieldName) {
            form.setError(`orders.${index}.${fieldName}`, {
              type: "server",
              message: errorMessage,
            });
          }
        }
      });
    }
  }, [serverErrors, form]);

  useEffect(() => {
    if (!shopOrderType) return;

    const currentOrders = form.getValues("orders");
    const needsUpdate = currentOrders.some((o) => !o.order_type);

    if (needsUpdate) {
      const updatedOrders = currentOrders.map((o) => ({
        ...o,
        order_type: o.order_type || shopOrderType,
      }));
      form.setValue("orders", updatedOrders, { shouldValidate: true });
    }
  }, [shopOrderType, form]);

  const copyOrderRow = async (index: number) => {
    const keys = Object.keys(form.getValues(`orders.${index}`)).map(
      (k) => `orders.${index}.${k}`,
    );

    const isValid = await form.trigger(keys as any);
    if (!isValid) return;

    const row = form.getValues(`orders.${index}`);

    append(row);
  };

  const selectedClientId = form.watch("client_id");

  const branchOptions = useMemo(() => {
    if (!selectedClientId) return [];

    const selectedClient = safeClientsDetails.find(
      (c) => String(c.id) === selectedClientId,
    );
    if (!selectedClient) return [];

    // Prefer shops nested directly on the selected client (reliable — this is
    // how the dispatcher shop filter resolves shops per client too), falling
    // back to matching the flattened shop list by clinet_id.
    const nestedShops = Array.isArray(selectedClient.shops)
      ? selectedClient.shops
      : null;

    const shopsForClient =
      nestedShops ??
      safeClients.filter(
        (shop) => String(shop.clinet_id) === String(selectedClient.id),
      );

    return shopsForClient.map((c) => ({
      value: String(c.id),
      label: c.name,
    }));
  }, [selectedClientId, safeClientsDetails, safeClients]);

  const prevClientIdRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (
      prevClientIdRef.current !== undefined &&
      prevClientIdRef.current !== selectedClientId
    ) {
      form.setValue("shopname", "", { shouldValidate: true });
    }
    prevClientIdRef.current = selectedClientId;
  }, [selectedClientId, form]);

  const onSubmit = (data: CreateOrderFormValues) => {
    const resolvedClientId = data.client_id || client_Id;
    console.log(
      "onSubmit - resolved client_id:",
      resolvedClientId,
      "| data.client_id:",
      data.client_id,
      "| client_Id:",
      client_Id,
    );
    const payload: CreateOrderIndexedPayload = {
      client_id: resolvedClientId,
      shopname: data.shopname,
      client_order_id: data.orders.map((r) => r.order_id),
      delivery_type: data.orders.map((r) => Number(r.order_type)),

      delivery_date: data.orders.map((r) =>
        r.order_date ? toApiDate(r.order_date) : null,
      ),
      delivery_time: data.orders.map((r) => r.delivery_time ?? ""),
      customer_name: data.orders.map(() => ""),
      customer_number: data.orders.map((r) => r.mobile),
      delivery_payment_mode: data.orders.map((r) => r.payment_method ?? "Auto"),
      amount: data.orders.map((r) => Number(r.bill_amount ?? 0)),
      address: data.orders.map((r) => r.delivery_address ?? ""),
    };
    createOrder(payload, {
      onSuccess: () => {},
      onError: (err) => {
        console.error("Mutation Error:", err);
      },
    });
  };

  const onInvalid = (errors: any) => {
    console.error("Form Validation Errors:", errors);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex h-[88vh] w-full flex-col gap-0 overflow-hidden p-0 shadow-xl sm:max-w-8xl"
        aria-describedby={undefined}
      >
        <DialogHeader className="shrink-0 border-b bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
          <DialogTitle className="flex items-center gap-3 text-base font-semibold text-primary-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/15">
              <PackagePlus className="h-4.5 w-4.5" />
            </span>
            <span className="flex flex-col gap-0.5">
              Create Order
              <span className="text-xs font-normal text-primary-foreground/70">
                Add one or more shipments for pickup and delivery
              </span>
            </span>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground uppercase">
                <Store className="h-3.5 w-3.5 text-primary" />
                Client &amp; branch
              </div>
              <div className="grid grid-cols-1 gap-4 rounded-xl border-2 border-primary/15 bg-card p-4 shadow-sm sm:grid-cols-2">
                {hasSingleClient ? (
                  <div className="space-y-2">
                    <label className="flex items-center text-sm leading-none font-semibold text-foreground">
                      Client
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      disabled
                      className="w-full justify-between border-2 border-input bg-background font-medium opacity-100 disabled:opacity-100"
                    >
                      <span className="truncate">
                        {safeClientsDetails[0]?.name ?? ""}
                      </span>
                    </Button>
                  </div>
                ) : (
                  <FormField
                    control={form.control}
                    name="client_id"
                    render={({ field }) => (
                      <FormItem>
                        <BranchCheckboxDropdown
                          label="Select Client"
                          placeholder="Select client"
                          searchPlaceholder="Search clients..."
                          options={safeClientsDetails.map((c) => ({
                            value: String(c.id),
                            label: c.name,
                          }))}
                          value={field.value}
                          onChange={field.onChange}
                          autoClose={true}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="shopname"
                  render={({ field }) => (
                    <FormItem>
                      <BranchCheckboxDropdown
                        label="Select Branch"
                        placeholder={
                          selectedClientId
                            ? "Select branch"
                            : "Select a client first"
                        }
                        options={branchOptions}
                        value={field.value}
                        onChange={field.onChange}
                        autoClose={true}
                        disabled={!selectedClientId}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    <PackagePlus className="h-3.5 w-3.5" />
                    Orders
                  </div>
                  <span className="rounded-full border bg-muted/40 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {fields.length} {fields.length === 1 ? "order" : "orders"}
                  </span>
                </div>

                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {fields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        layout
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                      >
                        <OrderRow
                          index={index}
                          form={form}
                          remove={remove}
                          append={append}
                          isSingleRow={fields.length === 1}
                          onCopy={copyOrderRow}
                          shouldHideFields={
                            Boolean(selectedShopId) && hasOrderTypeOne
                          }
                          shopOrderType={shopOrderType}
                          timeSlots={timeSlots}
                          requireDeliveryLocation={requireDeliveryLocation}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-2 border-dashed border-primary/40 text-primary hover:border-primary hover:bg-primary/5 hover:text-primary disabled:border-input disabled:text-muted-foreground"
                    disabled={!selectedShopId}
                    onClick={async () => {
                      const lastIndex = fields.length - 1;
                      const isValid = await form.trigger([
                        `orders.${lastIndex}.order_id`,
                        `orders.${lastIndex}.order_date`,
                        `orders.${lastIndex}.delivery_time`,
                        `orders.${lastIndex}.mobile`,
                        `orders.${lastIndex}.payment_method`,
                        `orders.${lastIndex}.bill_amount`,
                        `orders.${lastIndex}.delivery_address`,
                      ]);

                      if (!isValid) {
                        return;
                      }

                      append({
                        order_id: "",
                        order_type: shopOrderType,
                        order_date: null,
                        delivery_time: "",
                        mobile: "",
                        payment_method: "1",
                        bill_amount: "",
                        delivery_address: "",
                      });
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add another order
                  </Button>
                  {!selectedShopId && (
                    <span className="text-xs text-muted-foreground">
                      Select a branch above to add orders
                    </span>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="shrink-0 gap-2 border-t bg-muted/20 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
              <Button
                type="submit"
                disabled={creatingOrder}
                className="min-w-32"
              >
                {creatingOrder
                  ? "Creating…"
                  : `Create ${fields.length > 1 ? `${fields.length} orders` : "order"}`}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

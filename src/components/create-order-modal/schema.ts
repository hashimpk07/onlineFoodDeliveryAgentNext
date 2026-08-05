import * as z from "zod";

export const orderRowSchema = z
  .object({
    order_id: z.string().min(1, "Order ID is required"),
    order_type: z
      .string({
        required_error: "The delivery type field is required.",
        invalid_type_error: "The delivery type field is required.",
      })
      .min(1, "The delivery type field is required."),
    order_date: z.date().nullable().optional(),
    delivery_time: z.string().optional(),
    mobile: z.string().min(1, "Mobile is required"),
    payment_method: z.string().nullable().optional(),
    bill_amount: z.string(),

    delivery_address: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.payment_method !== "1") {
      if (!data.bill_amount || data.bill_amount.trim() === "") {
        ctx.addIssue({
          path: ["bill_amount"],
          message: "Amount is required",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

// export const createOrderSchema = z.object({
//   client_id: z.coerce.string().min(1, "Client is required"),
//   shopname: z.coerce.string().min(1, "Branch is required"),
//   orders: z.array(orderRowSchema).min(1, "At least one order is required"),
//   // delivery_type: z
//   //   .string({
//   //     required_error: "The delivery type field is required.",
//   //     invalid_type_error: "The delivery type field is required.",
//   //   })
//   //   .min(1, "The delivery type field is required."),
// });

export const createOrderSchema = z
  .object({
    client_id: z.coerce.string().min(1, "Client is required"),
    shopname: z.coerce.string().min(1, "Branch is required"),
    orders: z.array(orderRowSchema).min(1, "At least one order is required"),
  })
  .superRefine((data, ctx) => {
    const seen = new Map<string, number>();

    data.orders.forEach((order, index) => {
      const id = order.order_id?.trim();

      if (!id) return;

      if (seen.has(id)) {
        const firstIndex = seen.get(id);

        // Error on current duplicate
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Order ID must be unique",
          path: ["orders", index, "order_id"],
        });

        // Error on original
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Order ID must be unique",
          path: ["orders", firstIndex, "order_id"],
        });
      } else {
        seen.set(id, index);
      }
    });
  });

export type CreateOrderFormValues = z.infer<typeof createOrderSchema>;

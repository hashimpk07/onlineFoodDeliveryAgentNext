import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Web Hook url is required")
    .url("Enter a valid web hook url"),
});

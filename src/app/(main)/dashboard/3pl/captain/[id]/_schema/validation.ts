import { z } from "zod";

// File validation helpers
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_DOC_TYPES = ["application/pdf", ...ACCEPTED_IMAGE_TYPES];

// Base schema for both create and edit modes
const baseCaptainFormSchema = z.object({
  // Information Section
  firstname: z.string().min(1, "The fullname field is required."),
  phone_number: z.string().min(1, "The phone number field is required."),
  iqama_number: z.string().min(1, "The iqama number field is required."),
  iqama_expiry_date: z.string().min(1, "Residential ID expiry is required."),
  licence_number: z.string().min(1, "The licence number field is required."),
  licence_expiry_date: z.string().min(1, "Driving license expiry is required."),
  nationality: z.string().min(1, "The nationality field is required."),

  // Work Information Section
  date_of_joining: z.string().min(1, "Joined date is required."),
  regions: z.array(z.string()).min(1, "Select at least one working area"),
  status: z.string().min(1, "Activation status is required."),
  asset_category: z.array(z.string()).optional(),
  asset: z.array(z.string()).optional(),
  // employment_type: z.string().min(1, "Employment type is required."),
  type_of_vehicle: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => {
      // Handle array format (from API)
      if (Array.isArray(val)) {
        return val.length > 0 ? val[0] : "";
      }
      // Handle string format
      return val || "";
    })
    .optional(),
  vehicle: z.string().optional(),
  given_custodyamount: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d+(\.\d+)?$/.test(val),
      "Custody amount must be a valid number.",
    ),
  monthly_salary: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d+(\.\d+)?$/.test(val),
      "Monthly salary must be a valid number.",
    ),
  daily_rent: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d+(\.\d+)?$/.test(val),
      "Daily rent must be a valid number.",
    ),
  commission_rule_id: z.string().optional(),
  vehicle_images: z
    .array(z.any())
    .optional()
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        files.every((file) => file?.size <= MAX_FILE_SIZE),
      "Each file size should be less than 1MB.",
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
      "Only image files (JPEG, PNG, WebP) are accepted for vehicle images.",
    ),
  auto_assign_priority: z
    .string()
    .min(1, "The auto assign priority field is required.")
    .refine(
      (val) => /^\d+$/.test(val),
      "Auto assign priority must be a valid number.",
    ),
  rent_valid_from: z.string().min(1, "Rent valid from is required."),

  // Login Information Section
  email: z
    .string()
    .min(1, "The email field is required.")
    .email("Please enter a valid email address."),

  // Files - Optional in edit mode, will be validated conditionally
  iqama: z.any().optional(),
  licence: z.any().optional(),
  upload_agreement_copy: z.any().optional(),

  // Passwords - Optional in edit mode
  password: z.string().optional(),
  password_confirmation: z.string().optional(),
});

// Schema for CREATE mode - files and passwords are required
export const captainCreateSchema = baseCaptainFormSchema
  .extend({
    iqama: z
      .any()
      .refine((files) => files?.length > 0, "The iqama field is required.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        "File size should be less than 1MB.",
      )
      .refine(
        (files) => ACCEPTED_DOC_TYPES.includes(files?.[0]?.type),
        "Only PDF and image files are accepted.",
      ),
    licence: z
      .any()
      .refine((files) => files?.length > 0, "The licence field is required.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        "File size should be less than 1MB.",
      )
      .refine(
        (files) => ACCEPTED_DOC_TYPES.includes(files?.[0]?.type),
        "Only PDF and image files are accepted.",
      ),
    password: z.string().min(6, "Password must be at least 6 characters."),
    password_confirmation: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

// Schema for EDIT mode - files and passwords are optional
export const captainEditSchema = baseCaptainFormSchema
  .extend({
    // Files are optional in edit mode
    iqama: z
      .any()
      .optional()
      .refine(
        (files) =>
          !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
        "File size should be less than 1MB.",
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          ACCEPTED_DOC_TYPES.includes(files[0]?.type),
        "Only PDF and image files are accepted.",
      ),
    licence: z
      .any()
      .optional()
      .refine(
        (files) =>
          !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
        "File size should be less than 1MB.",
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          ACCEPTED_DOC_TYPES.includes(files[0]?.type),
        "Only PDF and image files are accepted.",
      ),
    // Passwords are optional, but if provided, must match
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
  })
  .refine(
    (data) => {
      // If password is provided, confirmation must match
      if (data.password && data.password.length > 0) {
        return data.password === data.password_confirmation;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["password_confirmation"],
    },
  )
  .refine(
    (data) => {
      // If password is provided, it must be at least 6 characters
      if (data.password && data.password.length > 0) {
        return data.password.length >= 6;
      }
      return true;
    },
    {
      message: "Password must be at least 6 characters.",
      path: ["password"],
    },
  );

// Default export - Use this for backward compatibility
// This is now the same as captainCreateSchema
export const captainFormSchema = captainCreateSchema;

export type CaptainFormValues = z.infer<typeof captainCreateSchema>;

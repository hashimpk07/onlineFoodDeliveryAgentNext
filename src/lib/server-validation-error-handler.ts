/* eslint-disable */

import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { ValidationError } from "./server-action-error-handler";

/**
 * Handles server-side validation errors from Laravel backend
 * Maps backend validation errors to react-hook-form field errors
 *
 * @param error - The ValidationError object from server action result
 * @param form - The react-hook-form instance
 * @param options - Optional configuration
 * @returns true if validation errors were handled, false otherwise
 *
 * @example
 * ```typescript
 * const result = await createCaptain(formData);
 * if (!result.success) {
 *   handleServerValidationErrors(result.error, form);
 * } else {
 *   // Success - use result.data
 *   toast.success("Captain created!");
 * }
 * ```
 */
export function handleServerValidationErrors(
  error: ValidationError,
  form: UseFormReturn<any>,
  options?: {
    showToast?: boolean;
    toastMessage?: string;
    scrollToFirstError?: boolean;
  },
): boolean {
  const {
    showToast = true,
    toastMessage,
    scrollToFirstError = true,
  } = options ?? {};

  // Validate the error object structure
  if (!error || error.status !== 422 || !error.errors) {
    return false;
  }

  const { errors, message } = error;
  let firstErrorFieldName: string | null = null;

  // Iterate through each field error and set it in the form
  Object.keys(errors).forEach((fieldName, index) => {
    const errorMessages = errors[fieldName];

    // Track the first error field for scrolling
    if (index === 0) {
      firstErrorFieldName = fieldName;
    }

    // If errorMessages is an array, join them; otherwise use as is
    const errorMessage = Array.isArray(errorMessages)
      ? errorMessages.join(", ")
      : errorMessages;

    // Set the error for the specific field
    form.setError(fieldName, {
      type: "server",
      message: errorMessage,
    });
  });

  // Show toast notification if enabled
  if (showToast) {
    toast.error(toastMessage ?? message ?? "Validation failed");
  }

  // Scroll to the first error field if enabled
  if (scrollToFirstError && firstErrorFieldName) {
    // Small delay to ensure the error is rendered
    setTimeout(() => {
      const errorElement = document.querySelector(
        `[name="${firstErrorFieldName}"]`,
      );
      if (errorElement) {
        errorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        // Focus the input if it's focusable
        if (errorElement instanceof HTMLElement && errorElement.focus) {
          errorElement.focus();
        }
      }
    }, 100);
  }

  return true;
}

/**
 * Extract a user-friendly error message from a ValidationError
 * Useful for displaying generic error messages
 */
export function extractErrorMessage(
  error: ValidationError | undefined,
  fallback = "An error occurred",
): string {
  if (!error) return fallback;
  return error.message ?? "Validation failed";
}

/**
 * Clears all server-side validation errors from the form
 * Useful when you want to reset errors before a new submission
 */
export function clearServerErrors(form: UseFormReturn<any>) {
  const errors = form.formState.errors;

  Object.keys(errors).forEach((fieldName) => {
    const error = errors[fieldName];
    // Only clear errors that were set by the server
    if (error && error.type === "server") {
      form.clearErrors(fieldName);
    }
  });
}

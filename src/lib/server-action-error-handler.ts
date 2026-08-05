/**
 * Utility for handling validation errors in Next.js server actions
 *
 * This helper handles Laravel validation errors in a way that works properly
 * with React Server Actions by RETURNING errors instead of THROWING them.
 *
 * Reference: https://joulev.dev/blogs/throwing-expected-errors-in-react-server-actions
 */

/**
 * Standard validation error structure
 */
export interface ValidationError {
  status: 422;
  message: string;
  errors: Record<string, string | string[]>;
}

/**
 * Success result type
 */
export interface SuccessResult<T> {
  success: true;
  data: T;
}

/**
 * Error result type
 */
export interface ErrorResult {
  success: false;
  error: ValidationError;
}

/**
 * Combined result type for server actions
 */
export type ServerActionResult<T> = SuccessResult<T> | ErrorResult;

/**
 * Handles validation errors from server actions
 * RETURNS a structured error instead of throwing
 *
 * @param error - The axios error object
 * @returns ErrorResult if validation error, null otherwise
 *
 * @example
 * ```typescript
 * export async function createUser(formData: FormData) {
 *   try {
 *     const response = await api.post("/users", formData);
 *     return { success: true, data: unwrapResponse(response) };
 *   } catch (error: any) {
 *     const validationError = handleServerActionValidationError(error);
 *     if (validationError) return validationError;
 *
 *     // Handle other errors
 *     return {
 *       success: false,
 *       error: {
 *         status: 422,
 *         message: "An unexpected error occurred",
 *         errors: {}
 *       }
 *     };
 *   }
 * }
 * ```
 */
interface AxiosLikeError {
  response?: {
    status?: number;
    data?: {
      message?: string;
      errors?: Record<string, string | string[]>;
    };
  };
  digest?: string;
  message?: string;
}

export function handleServerActionValidationError(
  error: unknown,
): ErrorResult | null {
  const err = error as AxiosLikeError;
  if (err.response?.status === 422) {
    return {
      success: false,
      error: {
        status: 422,
        message: err.response.data?.message ?? "Validation failed",
        errors: err.response.data?.errors ?? {},
      },
    };
  }
  return null;
}

/**
 * Wraps a server action with automatic validation error handling
 * The wrapped function returns a result object instead of throwing errors
 *
 * @param fn - The async function to wrap
 * @returns Wrapped function that returns ServerActionResult
 *
 * @example
 * ```typescript
 * export const createUser = withServerActionErrorHandling(
 *   async (formData: FormData) => {
 *     const response = await api.post("/users", formData);
 *     return unwrapResponse(response);
 *   }
 * );
 *
 * // Usage in component:
 * const result = await createUser(formData);
 * if (!result.success) {
 *   // Handle error
 *   handleServerValidationErrors(result.error, form);
 * } else {
 *   // Use result.data
 * }
 * ```
 */
function isNextControlFlowError(error: unknown): boolean {
  const digest = (error as AxiosLikeError).digest;
  if (digest === undefined) return false;
  return digest.startsWith("NEXT_REDIRECT") || digest === "NEXT_NOT_FOUND";
}

export function withServerActionErrorHandling<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
): (...args: T) => Promise<ServerActionResult<R>> {
  return async (...args: T): Promise<ServerActionResult<R>> => {
    try {
      const data = await fn(...args);
      return { success: true, data };
    } catch (error: unknown) {
      // Let Next.js redirect()/notFound() signals bubble up — they must not
      // be swallowed into a returned error object (e.g. the 401 -> login redirect).
      if (isNextControlFlowError(error)) {
        throw error;
      }

      const validationError = handleServerActionValidationError(error);
      if (validationError) {
        return validationError;
      }

      // For non-validation errors, return a generic error
      return {
        success: false,
        error: {
          status: 422,
          message:
            (error as AxiosLikeError).message ?? "An unexpected error occurred",
          errors: {},
        },
      };
    }
  };
}

/**
 * Type guard to check if a result is an error
 */
export function isErrorResult<T>(
  result: ServerActionResult<T>,
): result is ErrorResult {
  return !result.success;
}

/**
 * Type guard to check if a result is successful
 */
export function isSuccessResult<T>(
  result: ServerActionResult<T>,
): result is SuccessResult<T> {
  return result.success;
}

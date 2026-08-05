// Error Display Component Types

/**
 * Available error types that determine the icon and color scheme
 */
export type ErrorType =
  "server" | "network" | "forbidden" | "notfound" | "default";

/**
 * Props for the ErrorDisplay component
 */
export interface ErrorDisplayProps {
  /**
   * The error code to display (e.g., '500', '404', '403')
   * @default '500'
   */
  errorCode?: string;

  /**
   * The type of error which affects the icon and color scheme
   * @default 'server'
   */
  errorType?: ErrorType;

  /**
   * The main title/heading for the error
   * @default 'Internal Server Error'
   */
  title?: string;

  /**
   * The descriptive message explaining the error
   * @default 'Something went wrong on our end. Please try again later.'
   */
  message?: string;

  /**
   * Optional technical details or error reference ID
   * @default null
   */
  details?: string | null;

  /**
   * Whether to show the retry button
   * @default true
   */
  showRetry?: boolean;

  /**
   * Whether to show the home button
   * @default true
   */
  showHome?: boolean;

  /**
   * Whether to show the back button
   * @default false
   */
  showBack?: boolean;

  /**
   * Callback function when retry button is clicked
   * @default () => window.location.reload()
   */
  onRetry?: () => void;

  /**
   * Callback function when home button is clicked
   * @default () => window.location.href = '/'
   */
  onHome?: () => void;

  /**
   * Callback function when back button is clicked
   * @default () => window.history.back()
   */
  onBack?: () => void;
}

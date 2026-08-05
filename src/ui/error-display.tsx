import { ErrorDisplayProps } from "@/types/error";
import {
  AlertCircle,
  ServerCrash,
  WifiOff,
  Lock,
  FileQuestion,
  RefreshCw,
  Home,
  ArrowLeft,
} from "lucide-react";

const ErrorDisplay = ({
  errorCode = "500",
  errorType = "server",
  title = "Internal Server Error",
  message = "Something went wrong on our end. Please try again later.",
  details = null,
  showRetry = true,
  showHome = true,
  showBack = false,
  onRetry = () => window.location.reload(),
  onHome = () => (window.location.href = "/"),
  onBack = () => window.history.back(),
}: ErrorDisplayProps) => {
  const getErrorIcon = () => {
    const iconProps = { className: "h-12 w-12", strokeWidth: 1.5 };
    const icons = {
      server: <ServerCrash {...iconProps} />,
      network: <WifiOff {...iconProps} />,
      forbidden: <Lock {...iconProps} />,
      notfound: <FileQuestion {...iconProps} />,
      default: <AlertCircle {...iconProps} />,
    };
    return icons[errorType] || icons.default;
  };

  const getErrorColor = () => {
    const colors = {
      server: "text-red-600 border-red-200 bg-red-50",
      network: "text-blue-600 border-blue-200 bg-blue-50",
      forbidden: "text-amber-600 border-amber-200 bg-amber-50",
      notfound: "text-violet-600 border-violet-200 bg-violet-50",
      default: "text-destructive border-destructive/20 bg-destructive/5",
    };
    return colors[errorType] || colors.default;
  };

  const getButtonColor = () => {
    const colors = {
      server: "bg-red-600 hover:bg-red-700",
      network: "bg-blue-600 hover:bg-blue-700",
      forbidden: "bg-amber-600 hover:bg-amber-700",
      notfound: "bg-violet-600 hover:bg-violet-700",
      default: "bg-primary hover:bg-primary/90",
    };
    return colors[errorType] || colors.default;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-card rounded-lg border shadow-sm">
          <div className="p-8 md:p-12">
            {/* Error Icon and Code */}
            <div className="flex flex-col items-center text-center mb-8">
              <div
                className={`mb-6 rounded-full p-4 border-2 ${getErrorColor()}`}
              >
                {getErrorIcon()}
              </div>

              <div className="space-y-2">
                <h1 className="text-6xl md:text-7xl font-bold text-muted-foreground/40">
                  {errorCode}
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                  {title}
                </h2>
              </div>
            </div>

            {/* Error Message */}
            <div className="text-center mb-8 space-y-3">
              <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                {message}
              </p>

              {details && (
                <div className="mt-4 p-4 bg-muted/50 rounded-md border">
                  <p className="text-sm text-muted-foreground font-mono break-all">
                    {details}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              {showRetry && (
                <button
                  onClick={onRetry}
                  className={`inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-6 ${getButtonColor()}`}
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </button>
              )}

              {showHome && (
                <button
                  onClick={onHome}
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6"
                >
                  <Home className="h-4 w-4" />
                  Go Home
                </button>
              )}

              {showBack && (
                <button
                  onClick={onBack}
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </button>
              )}
            </div>

            {/* Footer Info */}
            <div className="mt-8 pt-6 border-t text-center">
              <p className="text-xs text-muted-foreground">
                If this problem persists, please contact our support team
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;

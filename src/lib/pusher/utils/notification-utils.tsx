import { toast } from "sonner";

export type ToastType = "info" | "success" | "warning" | "error";

interface NotificationOptions {
  heading: string;
  text: string;
  type?: ToastType;
  duration?: number;
}

export function showNotification({
  heading,
  text,
  type = "info",
  duration = 5000,
}: NotificationOptions): void {
  const message = (
    <div>
      <div className="font-semibold">{heading}</div>
      <div className="text-sm">{text}</div>
    </div>
  );

  switch (type) {
    case "success":
      toast.success(message, { duration });
      break;
    case "warning":
      toast.warning(message, { duration });
      break;
    case "error":
      toast.error(message, { duration });
      break;
    case "info":
    default:
      toast.info(message, { duration });
      break;
  }
}

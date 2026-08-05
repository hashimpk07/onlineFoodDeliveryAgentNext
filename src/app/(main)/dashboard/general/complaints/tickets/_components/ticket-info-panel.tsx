"use client";

import { useRouter } from "next/navigation";

import { FileText, MapPin, MessageCircle, Truck } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { useTicketDetails } from "../_hooks/use-ticket-details";

interface TicketInfoPanelProps {
  ticketId: number | null;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <p className="text-sm">
      <span className="font-semibold">{label}: </span>
      {value ?? "-"}
    </p>
  );
}

function buildWhatsAppLink(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://api.whatsapp.com/send?phone=${digits}`;
}

function CustomerNumberRow({ value }: { value: string | null }) {
  return (
    <p className="flex items-center gap-1.5 text-sm">
      <span className="font-semibold">Customer Number: </span>
      {value ?? "-"}
      {value && (
        <a
          href={buildWhatsAppLink(value)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="inline-flex"
        >
          <MessageCircle className="size-4 text-green-500 hover:text-green-600" />
        </a>
      )}
    </p>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: typeof FileText;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
      <Icon className="size-4" />
      {title}
    </div>
  );
}

export function TicketInfoPanel({ ticketId }: TicketInfoPanelProps) {
  const router = useRouter();
  const { details, isLoading, isError, error } = useTicketDetails(ticketId);

  if (!ticketId) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        No ticket selected.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full flex-col gap-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (isError || !details) {
    return (
      <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
        {error?.message ?? "Failed to load ticket details."}
      </div>
    );
  }

  const notImplemented = (action: string) =>
    toast.info(`${action} is not connected to a backend endpoint yet.`);

  const handleGoToOrder = () => {
    if (!details.order_db_id) {
      toast.error("No order is linked to this ticket.");
      return;
    }
    router.push(`/dashboard/general/orders/dispatcher/${details.order_db_id}`);
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto">
      <div className="space-y-2">
        <SectionHeader icon={Truck} title="Shipping Information" />
        <InfoRow label="Client" value={details.client_name} />
        <InfoRow label="Client Shop" value={details.client_shop} />
        <InfoRow
          label="Client Order ID"
          value={details.client_order_id ? `#${details.client_order_id}` : null}
        />
        <InfoRow label="Created Date" value={details.created_date} />
        <p className="text-sm">
          <span className="font-semibold">Delivery Type: </span>
          {details.delivery_type ? (
            <Badge className="bg-orange-500 text-white hover:bg-orange-500">
              {details.delivery_type}
            </Badge>
          ) : (
            "-"
          )}
        </p>
      </div>

      <Separator />

      <div className="space-y-2">
        <SectionHeader icon={FileText} title="Billing Information" />
        <InfoRow label="Customer Name" value={details.customer_name} />
        <CustomerNumberRow value={details.customer_number} />
        <InfoRow label="Customer Email" value={details.customer_email} />
        <InfoRow label="Address" value={details.address} />
      </div>

      <Separator />

      <div className="space-y-2">
        <SectionHeader icon={MapPin} title="Delivery Info" />
        <InfoRow label="Order ID" value={`#${details.order_id}`} />
        <InfoRow label="Payment Mode" value={details.payment_mode} />
        <InfoRow
          label="Status"
          value={details.status ? `#${details.status}` : null}
        />
        <InfoRow label="Captain Name" value={details.captain_name} />
        <InfoRow label="Captain Mobile" value={details.captain_mobile} />
      </div>

      <div className="mt-auto flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => notImplemented("Cancel Order")}
        >
          Cancel Order
        </Button>
        <Button className="flex-1" onClick={handleGoToOrder}>
          Go To Order
        </Button>
      </div>
    </div>
  );
}

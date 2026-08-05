import { CreditCard, Loader, Package, Truck, X } from "lucide-react";

import { OrderLogsTable } from "@/app/[locale]/(main)/streamline-client/_components/order-details/order-logs";
import {
  OrderDetailsModalProps,
  OrderResponse,
} from "@/app/[locale]/(main)/streamline-client/_components/order-details/types";
import { useOrderDetails } from "@/app/[locale]/(main)/streamline-client/_hooks/use-order-details";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { InfoRow } from "./info-row";

interface SectionCardProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}

function SectionCard({ icon: Icon, title, children }: SectionCardProps) {
  return (
    <div className="rounded-xl overflow-hidden border">
      <div className="bg-[#1e4d5e] px-4 py-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-white/80" />
        <p className="text-xs font-semibold uppercase tracking-widest text-white">
          {title}
        </p>
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  );
}

function ShippingInfo({ data }: { data: OrderResponse }) {
  const { shipping } = data;
  return (
    <SectionCard icon={Package} title="Shipping Information">
      <InfoRow label="Client Name" value={shipping.client_name} />
      <InfoRow label="Shop" value={shipping.shop} />
      <InfoRow label="Client Order ID" value={shipping.client_order_id} />
      <InfoRow label="Created Date" value={shipping.created_at} />
      <InfoRow
        label="Delivery Type"
        value={<Badge className="bg-primary">{shipping.delivery_type}</Badge>}
      />
    </SectionCard>
  );
}

function BillingInfo({ data }: { data: OrderResponse }) {
  const { billing } = data;
  return (
    <SectionCard icon={CreditCard} title="Billing Information">
      <InfoRow label="Customer Name" value={billing.customer_name} />
      <InfoRow label="Customer Number" value={billing.customer_number} />
      <InfoRow label="Customer Email" value={billing.email} />
      <div className="pt-1">
        <span className="text-xs text-muted-foreground block mb-1">
          Address
        </span>
        <span className="text-sm">{billing.address}</span>
      </div>
    </SectionCard>
  );
}

function DeliveryInfo({ data }: { data: OrderResponse }) {
  const { delivery_info } = data;
  return (
    <SectionCard icon={Truck} title="Delivery Info">
      <InfoRow label="Order ID" value={delivery_info.order_id} />
      <InfoRow label="Payment Mode" value={delivery_info.payment_mode} />
      <InfoRow
        label="Status"
        value={<Badge className="bg-primary">{delivery_info.status}</Badge>}
      />
      <InfoRow label="Captain Name" value={delivery_info.captain} />
      <InfoRow label="Captain Mobile" value={delivery_info.captain_phone} />
    </SectionCard>
  );
}

export function OrderDetailsModal({
  open,
  onOpenChange,
  title = "Order Details",
  selectedOrderId,
}: OrderDetailsModalProps) {
  const { data, isLoading } = useOrderDetails(selectedOrderId ?? "");

  if (!selectedOrderId) return null;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Loader className="animate-spin mb-4 h-7 w-7" />
          <p className="text-sm">Loading order details...</p>
        </div>
      );
    }

    if (!data) {
      return (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No data found for this order.
        </p>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <ShippingInfo data={data} />
          <BillingInfo data={data} />
          <DeliveryInfo data={data} />
        </div>
        <OrderLogsTable
          logs={data.logs}
          orderId={data.shipping.client_order_id}
        />
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[95vw] sm:w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-xl"
        showCloseButton={false}
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b sticky top-0 z-10 bg-background">
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
            >
              <X size={20} />
            </Button>
          </DialogClose>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>

        <div className="p-6">{renderContent()}</div>
      </DialogContent>
    </Dialog>
  );
}

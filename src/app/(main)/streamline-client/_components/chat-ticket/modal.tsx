/* eslint-disable */

import { sendTicketMessage } from "@/app/[locale]/(main)/streamline-client/_api/get-order-details";
import InfoRow from "@/app/[locale]/(main)/streamline-client/_components/chat-ticket/info-row";
import Section from "@/app/[locale]/(main)/streamline-client/_components/chat-ticket/section";
import {
  chatModalProps,
  TicketMessage,
} from "@/app/[locale]/(main)/streamline-client/_components/chat-ticket/types";
import { useOrderChat } from "@/app/[locale]/(main)/streamline-client/_hooks/use-order-chat";
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
import { Loader, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ChatTicketDialog({
  open,
  onOpenChange,
  orderId,
}: chatModalProps) {
  const { data: orderDetails, isLoading: orderLoading } = useOrderDetails(
    orderId ?? "",
  );
  const { data: orderChat, isLoading: chatLoading } = useOrderChat(
    orderId ?? "",
  );
  const [input, setInput] = useState("");
  const [optimisticMessages, setOptimisticMessages] = useState<TicketMessage[]>(
    [],
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const allMessages = [...(orderChat ?? []), ...optimisticMessages];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages.length]);

  if (!orderId) return null;

  const sendMessage = async () => {
    if (!input?.trim()) return;
    const message = await sendTicketMessage(orderId, input);
    setOptimisticMessages((prev) => [...prev, message]);
    setInput("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[95vw] sm:w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl p-0 gap-0 rounded-xl h-[90vh] flex flex-col overflow-hidden"
        showCloseButton={false}
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
            >
              <X size={20} />
            </Button>
          </DialogClose>
          <DialogTitle className="text-lg font-semibold">
            Chat with Ticket
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Chat area */}
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-muted/20 min-h-0">
              {allMessages.map((msg: TicketMessage, index) =>
                msg.is_own ? (
                  <div key={index} className="flex justify-end">
                    <div className="max-w-xs rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm bg-[#fef9e7] border border-[#f5e6a3]">
                      <p className="text-xs font-bold mb-1">{msg.sender_name}</p>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs mt-1 text-right text-muted-foreground">
                        {msg?.send_at}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex justify-start">
                    <div className="max-w-xs rounded-2xl rounded-tl-sm px-4 py-3 bg-background shadow-sm border">
                      <p className="text-xs font-bold mb-1">{msg.sender_name}</p>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs mt-1 text-muted-foreground">
                        {msg?.send_at}
                      </p>
                    </div>
                  </div>
                ),
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t flex-shrink-0">
              <div className="flex items-center gap-3 rounded-xl px-4 py-2 border focus-within:border-primary transition">
                {chatLoading ? (
                  <Loader className="animate-spin h-4 w-4 text-muted-foreground" />
                ) : (
                  <>
                    <input
                      className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                      placeholder="Enter your message…"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <Button
                      onClick={sendMessage}
                      size="sm"
                      className="flex-shrink-0"
                    >
                      <Send size={15} />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Info sidebar */}
          <div className="w-72 flex-shrink-0 border-l bg-background px-5 py-4 flex flex-col gap-4 overflow-y-auto min-h-0">
            {orderLoading ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Loader className="animate-spin mb-4 h-6 w-6" />
                <p className="text-sm">Loading…</p>
              </div>
            ) : (
              <>
                <Section icon="🚚" title="Shipping Information">
                  <InfoRow
                    label="Client Name"
                    value={orderDetails?.shipping.client_name ?? "-"}
                  />
                  <InfoRow
                    label="Shop"
                    value={orderDetails?.shipping.shop ?? "-"}
                  />
                  <InfoRow
                    label="Client Order ID"
                    value={orderDetails?.shipping.client_order_id ?? "-"}
                  />
                  <InfoRow
                    label="Created Date"
                    value={orderDetails?.shipping.created_at ?? "-"}
                  />
                  <InfoRow
                    label="Delivery Type"
                    valueEl={
                      <Badge>
                        {orderDetails?.shipping.delivery_type ?? "-"}
                      </Badge>
                    }
                  />
                </Section>

                <Section icon="🧾" title="Billing Information">
                  <InfoRow
                    label="Customer Name"
                    value={orderDetails?.billing.customer_name ?? "-"}
                  />
                  <InfoRow
                    label="Customer Number"
                    value={orderDetails?.billing.customer_number ?? "-"}
                  />
                  <InfoRow
                    label="Customer Email"
                    value={orderDetails?.billing.email ?? "-"}
                  />
                  <InfoRow
                    label="Address"
                    value={orderDetails?.billing.address ?? "-"}
                  />
                </Section>

                <Section icon="🚚" title="Delivery Info">
                  <InfoRow
                    label="Order ID"
                    value={orderDetails?.delivery_info.order_id ?? "-"}
                  />
                  <InfoRow
                    label="Payment Mode"
                    value={orderDetails?.delivery_info.payment_mode ?? "-"}
                  />
                  <InfoRow
                    label="Status"
                    valueEl={
                      <Badge className="bg-primary">
                        {orderDetails?.delivery_info.status ?? "-"}
                      </Badge>
                    }
                  />
                  <InfoRow
                    label="Captain Name"
                    value={orderDetails?.delivery_info.captain ?? "-"}
                  />
                  <InfoRow
                    label="Captain Mobile"
                    value={orderDetails?.delivery_info.captain_phone ?? "-"}
                  />
                </Section>

                <Button className="w-full text-sm font-semibold mt-auto">
                  Go To Order
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

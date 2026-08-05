"use client";

import { Printer } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { CaptainCommissionDetails } from "../_types/captain-commission-details-type";

interface InvoiceModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  data: CaptainCommissionDetails | null;
}

export function InvoiceModal({ open, onClose, data }: InvoiceModalProps) {
  if (!data) return null;

  const commissionPayments = data.commission_payments ?? [];
  const attachments = data.attachments ?? [];
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER ?? "";
  const hasContent = commissionPayments.length > 0 || attachments.length > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold uppercase tracking-wider">
            Attached Documents
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5 space-y-4">
          {!hasContent ? (
            <div className="rounded-xl overflow-hidden border">
              <div className="bg-[#1e4d5e] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-white">
                  Documents
                </p>
              </div>
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                No documents found
              </p>
            </div>
          ) : (
            <>
              {commissionPayments.length > 0 && (
                <div className="rounded-xl overflow-hidden border">
                  <div className="bg-[#1e4d5e] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white">
                      Generated Invoices
                    </p>
                  </div>
                  <div className="divide-y">
                    {commissionPayments
                      .sort(
                        (a, b) =>
                          new Date(b.settled_at).getTime() -
                          new Date(a.settled_at).getTime(),
                      )
                      .map((payment) => (
                        <div
                          key={payment.id}
                          className="flex items-center justify-between px-4 py-3"
                        >
                          <span className="text-sm text-muted-foreground">
                            Invoice #{payment.id}
                          </span>
                          <a
                            href={`${baseUrl}/3pl/3pl_api/captain/commission/${payment.id}/receipt`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium"
                          >
                            View <Printer size={14} />
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {attachments.length > 0 && (
                <div className="rounded-xl overflow-hidden border">
                  <div className="bg-[#1e4d5e] px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white">
                      Attachments
                    </p>
                  </div>
                  <div className="divide-y">
                    {attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-4 py-3"
                      >
                        <span className="text-sm text-muted-foreground">
                          Attachment {index + 1}
                        </span>
                        <a
                          href={attachment.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium"
                        >
                          View <Printer size={14} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

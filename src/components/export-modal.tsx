"use client";

import { useState } from "react";

import { toast } from "sonner";

import { submitExportRequest } from "@/actions/export";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useExportStore } from "@/providers/export-store-provider";

export function ExportModal() {
  const store = useExportStore((s) => s);
  const { closeModal } = store;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) {
      toast.error("Email Required", {
        description: "Please enter your email address.",
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      toast.error("Invalid Email", {
        description: "Please enter a valid email address.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setIsSubmitting(true);
    try {
      const response = await submitExportRequest(
        store.exportUrl ?? "",
        store.method,
        { ...(store.payload ?? {}), email, reportType: store.reportType },
      );

      if (response.status === "success") {
        toast.success("Export Progress Started", {
          description:
            "We will send your exported file to the given mail address within a few minutes.",
        });
        closeModal();
        setEmail("");
      } else {
        toast.error("Export Failed", {
          description: response.message ?? "An error occurred.",
        });
      }
    } catch {
      toast.error("Export Failed", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={store.isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold">
            Export Report
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5">
            <div className="rounded-xl overflow-hidden border">
              <div className="bg-[#1e4d5e] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-white">
                  Delivery Details
                </p>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-sm text-muted-foreground">
                  We will send your exported file to the given email address
                  within a few minutes.
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="export-email">Email Address</Label>
                  <Input
                    id="export-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    autoFocus
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 pb-6 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !email.trim()}>
              {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
              Send Export
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* eslint-disable complexity */
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useCreateNotification } from "../_hooks/use-create-notification";
import { useSendableTypeData } from "../_hooks/use-sendable-type-data";

import { DailyReportFields } from "./daily-report-fields";

import type { CreateNotificationPayload, ReportGenerationBy } from "../_types";

const SUPPORTED_CLASSES = new Set(["DailyReport"]);

interface CreateNotificationModalProps {
  open: boolean;
  onClose: () => void;
  sendableTypes: string[];
}

function buildPayload(
  selectedClass: string,
  form: {
    title: string;
    frequency: string;
    time: string;
    emails: string;
    ccEmails: string;
    orderTimeFrom: string;
    orderTimeTo: string;
    reportGenerationBy: ReportGenerationBy;
    clientIds: string[];
    branchIds: string[];
  },
): CreateNotificationPayload {
  return {
    title: form.title.trim(),
    frequency: form.frequency as CreateNotificationPayload["frequency"],
    time: form.time,
    emails: form.emails.trim(),
    cc_emails: form.ccEmails.trim() || undefined,
    order_time_from: form.orderTimeFrom,
    order_time_to: form.orderTimeTo,
    report_generation_by: form.reportGenerationBy,
    clients:
      form.reportGenerationBy === "client_based"
        ? form.clientIds.map(Number)
        : undefined,
    branch:
      form.reportGenerationBy === "branch_based"
        ? form.branchIds.filter((id) => !id.startsWith("client-")).map(Number)
        : undefined,
  };
}

export function CreateNotificationModal({
  open,
  onClose,
  sendableTypes,
}: CreateNotificationModalProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("");
  const [time, setTime] = useState("09:00");
  const [emails, setEmails] = useState("");
  const [ccEmails, setCcEmails] = useState("");
  const [orderTimeFrom, setOrderTimeFrom] = useState("09:00");
  const [orderTimeTo, setOrderTimeTo] = useState("08:59");
  const [reportGenerationBy, setReportGenerationBy] =
    useState<ReportGenerationBy>("client_based");
  const [clientIds, setClientIds] = useState<string[]>([]);
  const [branchIds, setBranchIds] = useState<string[]>([]);

  const { data: typeData, isLoading: isLoadingTypeData } =
    useSendableTypeData(selectedClass);

  const resetForm = () => {
    setSelectedClass(null);
    setTitle("");
    setFrequency("");
    setTime("09:00");
    setEmails("");
    setCcEmails("");
    setOrderTimeFrom("09:00");
    setOrderTimeTo("08:59");
    setReportGenerationBy("client_based");
    setClientIds([]);
    setBranchIds([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const { mutate, isPending } = useCreateNotification(handleClose);

  const hasBranchSelection =
    branchIds.filter((id) => !id.startsWith("client-")).length > 0;
  const hasSelection =
    reportGenerationBy === "client_based"
      ? clientIds.length > 0
      : hasBranchSelection;

  const canSave =
    !!selectedClass &&
    !!title.trim() &&
    !!frequency &&
    !!time &&
    !!emails.trim() &&
    !!orderTimeFrom &&
    !!orderTimeTo &&
    hasSelection &&
    !isPending;

  const handleSave = () => {
    if (!canSave || !selectedClass) return;

    mutate({
      sendableClass: selectedClass,
      payload: buildPayload(selectedClass, {
        title,
        frequency,
        time,
        emails,
        ccEmails,
        orderTimeFrom,
        orderTimeTo,
        reportGenerationBy,
        clientIds,
        branchIds,
      }),
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold">
            Create Notification
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5 space-y-4 overflow-y-auto">
          {!selectedClass ? (
            <div className="space-y-2">
              <Label>Select Notification Type</Label>
              <div className="flex flex-col gap-2">
                {sendableTypes.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No notification types available.
                  </p>
                )}
                {sendableTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className="rounded-md border px-4 py-2.5 text-left text-sm hover:bg-muted transition-colors"
                    onClick={() => setSelectedClass(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          ) : !SUPPORTED_CLASSES.has(selectedClass) ? (
            <p className="text-sm text-muted-foreground">
              The &quot;{selectedClass}&quot; notification type doesn&apos;t
              have a form yet.
            </p>
          ) : (
            <DailyReportFields
              typeData={typeData}
              isLoading={isLoadingTypeData}
              disabled={isPending}
              title={title}
              setTitle={setTitle}
              orderTimeFrom={orderTimeFrom}
              setOrderTimeFrom={setOrderTimeFrom}
              orderTimeTo={orderTimeTo}
              setOrderTimeTo={setOrderTimeTo}
              reportGenerationBy={reportGenerationBy}
              setReportGenerationBy={setReportGenerationBy}
              clientIds={clientIds}
              setClientIds={setClientIds}
              branchIds={branchIds}
              setBranchIds={setBranchIds}
              frequency={frequency}
              setFrequency={setFrequency}
              time={time}
              setTime={setTime}
              emails={emails}
              setEmails={setEmails}
              ccEmails={ccEmails}
              setCcEmails={setCcEmails}
            />
          )}
        </div>

        <DialogFooter className="px-6 pb-6 border-t pt-4">
          {selectedClass && (
            <Button
              variant="ghost"
              onClick={() => setSelectedClass(null)}
              disabled={isPending}
            >
              Back
            </Button>
          )}
          <Button variant="outline" onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          {selectedClass && SUPPORTED_CLASSES.has(selectedClass) && (
            <Button onClick={handleSave} disabled={!canSave}>
              {isPending ? "Creating..." : "Create Notification"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

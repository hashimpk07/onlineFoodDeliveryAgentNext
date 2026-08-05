"use client";

import { useMemo } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { TreeSelect } from "@/components/ui/tree-select";

import type { ReportGenerationBy, SendableTypeData } from "../_types";

const FREQUENCY_OPTIONS = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

interface DailyReportFieldsProps {
  typeData: SendableTypeData | undefined;
  isLoading: boolean;
  disabled: boolean;
  title: string;
  setTitle: (v: string) => void;
  orderTimeFrom: string;
  setOrderTimeFrom: (v: string) => void;
  orderTimeTo: string;
  setOrderTimeTo: (v: string) => void;
  reportGenerationBy: ReportGenerationBy;
  setReportGenerationBy: (v: ReportGenerationBy) => void;
  clientIds: string[];
  setClientIds: (v: string[]) => void;
  branchIds: string[];
  setBranchIds: (v: string[]) => void;
  frequency: string;
  setFrequency: (v: string) => void;
  time: string;
  setTime: (v: string) => void;
  emails: string;
  setEmails: (v: string) => void;
  ccEmails: string;
  setCcEmails: (v: string) => void;
}

export function DailyReportFields({
  typeData,
  isLoading,
  disabled,
  title,
  setTitle,
  orderTimeFrom,
  setOrderTimeFrom,
  orderTimeTo,
  setOrderTimeTo,
  reportGenerationBy,
  setReportGenerationBy,
  clientIds,
  setClientIds,
  branchIds,
  setBranchIds,
  frequency,
  setFrequency,
  time,
  setTime,
  emails,
  setEmails,
  ccEmails,
  setCcEmails,
}: DailyReportFieldsProps) {
  const clientOptions = useMemo(
    () =>
      (typeData?.clients ?? []).map((c) => ({
        value: String(c.id),
        label: c.name ?? `Client ${c.id}`,
      })),
    [typeData],
  );

  const branchTreeData = useMemo(
    () =>
      (typeData?.clients ?? []).map((c) => ({
        id: `client-${c.id}`,
        label: c.name ?? `Client ${c.id}`,
        children: c.shops.map((s) => ({
          id: String(s.id),
          label: s.name,
        })),
      })),
    [typeData],
  );

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-xl" />;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="notif-title">Title (Subject of the mail)</Label>
        <Input
          id="notif-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="order-time-from">Order Time: From</Label>
          <Input
            id="order-time-from"
            type="time"
            value={orderTimeFrom}
            onChange={(e) => setOrderTimeFrom(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="order-time-to">Order Time: To</Label>
          <Input
            id="order-time-to"
            type="time"
            value={orderTimeTo}
            onChange={(e) => setOrderTimeTo(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Report Generation By</Label>
        <RadioGroup
          value={reportGenerationBy}
          onValueChange={(v) => setReportGenerationBy(v as ReportGenerationBy)}
          className="grid-flow-col justify-start gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="client_based" id="report-by-client" />
            <Label htmlFor="report-by-client" className="font-normal">
              Client Based
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="branch_based" id="report-by-branch" />
            <Label htmlFor="report-by-branch" className="font-normal">
              Branch Based
            </Label>
          </div>
        </RadioGroup>
      </div>

      {reportGenerationBy === "client_based" ? (
        <div className="space-y-1.5">
          <Label>Clients</Label>
          <MultiSelect
            options={clientOptions}
            selected={clientIds}
            onChange={setClientIds}
            placeholder="Select clients"
          />
        </div>
      ) : (
        <div className="space-y-1.5">
          <Label>Client Shops</Label>
          <div className="max-h-48 overflow-y-auto rounded-md border p-2">
            <TreeSelect
              data={branchTreeData}
              values={branchIds}
              onChange={setBranchIds}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <SearchableSelect
            label="Frequency"
            placeholder="Select frequency"
            options={FREQUENCY_OPTIONS}
            value={frequency}
            onChange={setFrequency}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="notif-time">Time</Label>
          <Input
            id="notif-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="notif-emails">Emails</Label>
          <Textarea
            id="notif-emails"
            placeholder="Comma separated values"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="notif-cc-emails">CC Emails</Label>
          <Textarea
            id="notif-cc-emails"
            placeholder="Comma separated values"
            value={ccEmails}
            onChange={(e) => setCcEmails(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}

import * as React from "react";

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

export function InfoRow({ label, value, valueClassName }: InfoRowProps) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-sm  font-medium">{label}</span>
      <span className={`text-sm font-semibold ${valueClassName || ""}`}>
        {value}
      </span>
    </div>
  );
}

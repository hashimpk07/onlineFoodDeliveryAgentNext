"use client";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

interface CompanyHeaderProps {
  name: string;
  subtitle?: string;
  backHref: string;
  eyebrow: string;
  actions?: React.ReactNode;
}

export function CompanyHeader({
  name,
  subtitle,
  backHref,
  eyebrow,
  actions,
}: CompanyHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between gap-4 pb-6">
      <div className="flex items-center gap-4 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => router.push(backHref)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Avatar className="size-11 shrink-0 ring-2 ring-primary/15">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
            {initials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="text-xl font-bold tracking-tight text-foreground truncate">
            {name}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  );
}

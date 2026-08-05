import * as React from "react";

import { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  iconColor?: string;
  iconBgColor?: string;
  children: React.ReactNode;
}

export function InfoCard({
  icon: Icon,
  title,
  iconColor = "",
  iconBgColor = "bg-blue-100",
  children,
}: InfoCardProps) {
  return (
    <Card className=" rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`${iconBgColor} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </Card>
  );
}

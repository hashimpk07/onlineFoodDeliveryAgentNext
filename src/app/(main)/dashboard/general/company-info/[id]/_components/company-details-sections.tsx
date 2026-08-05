"use client";

import React from "react";

import {
  Apple,
  ChevronRight,
  ExternalLink,
  FileText,
  Globe,
  Info,
  Mail,
  Phone,
  Smartphone,
} from "lucide-react";

import {
  CompanyInfo,
  PrivacyPolicy,
  SocialMedia,
  TermCondition,
} from "../../_types";

export const DetailField = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
}) => {
  if (!value) return null;
  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
      <div className="text-primary p-2 bg-primary/10 rounded-md mt-0.5">
        {icon}
      </div>
      <div className="flex flex-col space-y-1">
        <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    </div>
  );
};

export const GeneralInfoPanel = ({ company }: { company: CompanyInfo }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <DetailField
      icon={<Mail className="w-4 h-4" />}
      label="Email"
      value={company.email}
    />
    <DetailField
      icon={<Globe className="w-4 h-4" />}
      label="Website"
      value={company.website}
    />
    <DetailField
      icon={<Phone className="w-4 h-4" />}
      label="Mobile No"
      value={company.mobile_no}
    />
    <DetailField
      icon={<FileText className="w-4 h-4" />}
      label="Vat ID"
      value={company.vat_id}
    />
    {company.about && (
      <div className="col-span-1 sm:col-span-2 flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border mt-2">
        <div className="text-primary p-2 bg-primary/10 rounded-md mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="flex flex-col space-y-1.5 overflow-hidden">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            About
          </span>
          <p className="text-sm font-medium leading-relaxed">{company.about}</p>
        </div>
      </div>
    )}
  </div>
);

export const AppDetailsPanel = ({ company }: { company: CompanyInfo }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <DetailField
      icon={<Smartphone className="w-4 h-4" />}
      label="Android Version"
      value={company.app_version}
    />
    <DetailField
      icon={<Smartphone className="w-4 h-4" />}
      label="Android Min"
      value={company.min_supported_version}
    />
    <DetailField
      icon={<Apple className="w-4 h-4" />}
      label="iOS Version"
      value={company.app_version_ios}
    />
    <DetailField
      icon={<Apple className="w-4 h-4" />}
      label="iOS Min"
      value={company.min_supported_version_ios}
    />
  </div>
);

export const TermsPanel = ({ terms }: { terms?: TermCondition[] }) => {
  const filtered = terms?.filter((item) => item.term ?? item.condition) ?? [];
  if (filtered.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground italic text-sm border border-dashed rounded-lg">
        No terms and conditions available.
      </div>
    );
  }
  return (
    <div className="divide-y divide-border/50 border border-border/50 rounded-lg overflow-hidden">
      {filtered.map((item, index) => (
        <div
          key={item.id ?? index}
          className="p-4 hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-start space-x-3">
            <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-foreground text-sm">
                {item.term ?? "Term"}
              </p>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {item.condition ?? "Condition"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const PrivacyPanel = ({ policy }: { policy?: PrivacyPolicy[] }) => {
  const filtered = policy?.filter((item) => item.policy) ?? [];
  if (filtered.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground italic text-sm border border-dashed rounded-lg">
        No privacy policy available.
      </div>
    );
  }
  return (
    <div className="divide-y divide-border/50 border border-border/50 rounded-lg overflow-hidden">
      {filtered.map((item, index) => (
        <div
          key={item.id ?? index}
          className="p-4 hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-start space-x-3">
            <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="font-semibold text-foreground text-sm">
              {item.policy ?? "Policy"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SocialPanel = ({ social }: { social?: SocialMedia[] }) => {
  const filtered = social?.filter((item) => item.media_term ?? item.link) ?? [];
  if (filtered.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground italic text-sm border border-dashed rounded-lg">
        No social media links available.
      </div>
    );
  }
  return (
    <div className="divide-y divide-border/50 border border-border/50 rounded-lg overflow-hidden">
      {filtered.map((item, index) => (
        <div
          key={item.id ?? index}
          className="p-4 hover:bg-muted/30 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1 overflow-hidden pr-4">
              <span className="font-semibold text-foreground text-sm">
                {item.media_term ?? "Link"}
              </span>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm truncate"
              >
                {item.link}
              </a>
            </div>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

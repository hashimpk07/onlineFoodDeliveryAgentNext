"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import type { SimpleIcon } from "simple-icons";

type SimpleIconProps = {
  icon: SimpleIcon;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

export function SimpleIcon({ icon, className, ...props }: SimpleIconProps) {
  const { title, path } = icon;

  return (
    <svg
      viewBox="0 0 24 24"
      aria-label={title}
      aria-hidden="false"
      focusable="false"
      className={cn("fill-foreground size-5", className)}
      {...props}
    >
      <title>{title}</title>
      <path d={path} />
    </svg>
  );
}

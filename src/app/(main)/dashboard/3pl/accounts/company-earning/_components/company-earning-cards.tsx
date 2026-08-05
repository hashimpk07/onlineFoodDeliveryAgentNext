/* eslint-disable no-duplicate-imports */
"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CompanyEarningCardProps {
  title: string;
  count: string | number;
  imageSrc: string | StaticImageData;
  className?: string;
}

export function CompanyEarningCard({
  title,
  count,
  imageSrc,
  className,
}: CompanyEarningCardProps) {
  return (
    <Card className={cn("rounded-xl shadow-sm border", className)}>
      <CardContent className="flex flex-col items-center text-center p-5 space-y-2">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800">
          <Image
            src={imageSrc}
            alt={title}
            width={100}
            height={160}
            className="object-contain"
            unoptimized
          />
        </div>

        <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {count}
        </div>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
      </CardContent>
    </Card>
  );
}

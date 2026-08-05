/* eslint-disable no-duplicate-imports */
"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CaptainCommissionDetailsProps {
  title: string;
  count: string | number;
  imageSrc: string | StaticImageData;
  className?: string;
}

export function CaptainCommissionDetailsCard({
  title,
  count,
  imageSrc,
  className,
}: CaptainCommissionDetailsProps) {
  return (
    <Card className={cn("rounded-xl shadow-sm border", className)}>
      <CardContent className="flex flex-col items-center text-center space-y-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800">
          <Image
            src={imageSrc}
            alt={title}
            width={34}
            height={35}
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

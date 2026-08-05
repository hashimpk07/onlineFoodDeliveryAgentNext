"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import axiosInstance from "@/lib/axios";
import { useExportStore } from "@/providers/export-store-provider";

async function checkExportProgress(reportType: string) {
  const { data } = await axiosInstance.post("/check-progress", {
    reportType,
  });
  return data as { progress: number };
}

export const useExportReport = () => {
  const openModal = useExportStore((s) => s.openModal);

  const checkProgress = useMutation({
    mutationFn: checkExportProgress,
    onError: (error: unknown) => {
      console.error("Check progress failed:", error);
      toast.error("Error", {
        description: "Failed to check export status. Please try again.",
      });
    },
  });

  const handleExport = async ({
    reportType,
    exportUrl,
    payload = {},
  }: {
    reportType: string;
    exportUrl: string;
    payload?: Record<string, unknown>;
  }) => {
    openModal({ reportType, exportUrl, payload });
    return;

    // In the original logic: if(data.progress == 0) open modal, else show processing
    const response = await checkProgress.mutateAsync(reportType);
    if (response.progress === 0) {
      openModal({ reportType, exportUrl, payload });
    } else {
      toast.info("Processing...", {
        description:
          "Your document is being prepared for download. We'll notify you via email once the process is complete.",
      });
    }
  };

  return { handleExport, checkProgress };
};

/* eslint-disable */

"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { downloadCaptainDoc } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_api/download-captain-doc";
import { CaptainDetailsSkeleton } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/captain-detail-skelton";
import DocumentRow from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/document-row";
import { useCaptainDetails } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-captain-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DocumentsTable = () => {
  const { captain, isLoading, isError } = useCaptainDetails();

  const downloadMutation = useMutation({
    mutationFn: async ({
      fileUrl,
      filename,
    }: {
      fileUrl: string;
      filename: string;
    }) => {
      const result = await downloadCaptainDoc(fileUrl);
      if (!result || !result.data) {
        throw new Error("Failed to download file");
      }
      return { ...result, filename: result.filename || filename };
    },
    onSuccess: (result) => {
      // Convert base64 to blob
      const byteCharacters = atob(result.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = result.filename;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("File downloaded successfully");
    },
    onError: (error) => {
      console.error("Download error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to download file",
      );
    },
  });

  const handleDownload = (fileUrl: string | null, filename: string) => {
    if (!fileUrl) {
      toast.error("No file available");
      return;
    }

    downloadMutation.mutate({ fileUrl, filename });
  };

  if (isLoading) {
    return <CaptainDetailsSkeleton />;
  }

  if (isError || !captain) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load captain details
      </div>
    );
  }

  return (
    <Card className="max-w-7xl mx-auto mt-5">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            CAPTAIN DOCUMENTS
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-0">
          <DocumentRow
            filename="Iqama"
            filePath={captain?.files?.iqama_file_path}
            onDownload={() => {
              handleDownload(captain?.files?.license_file_path, "iqama");
            }}
          />

          <DocumentRow
            filename="Licence"
            filePath={captain?.files?.license_file_path}
            onDownload={() => {
              handleDownload(captain?.files?.license_file_path, "license");
            }}
          />

          <DocumentRow
            filename="Agreement"
            filePath={captain?.files?.agreement}
            onDownload={() => {
              handleDownload(captain?.files?.license_file_path, "agreement");
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsTable;

import { AlertCircle, Download, Eye, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DocumentRowProps {
  filename: string;
  filePath?: string | null;
  onDownload?: () => void;
  onView?: () => void;
}

export default function DocumentRow({
  filename,
  filePath,
  onDownload,
  onView,
}: DocumentRowProps) {
  const handleDownload = () => {
    if (filePath && onDownload) {
      onDownload();
    } else if (filePath) {
      window.open(filePath, "_blank");
    }
  };

  const handleView = () => {
    if (filePath && onView) {
      onView();
    } else if (filePath) {
      window.open(filePath, "_blank");
    }
  };

  return (
    <div className="flex justify-between items-center py-4 border-b border-border last:border-b-0  transition-colors group">
      {/* Filename Column */}
      <div className="flex items-center gap-3">
        <div
          className={`p-2.5 rounded-lg transition-colors ${
            filePath
              ? "bg-blue-100 dark:bg-blue-950 group-hover:bg-blue-200 dark:group-hover:bg-blue-900"
              : "bg-red-100 dark:bg-red-950 group-hover:bg-red-200 dark:group-hover:bg-red-900"
          }`}
        >
          <FileText
            className={`w-5 h-5 ${
              filePath
                ? "text-blue-600 dark:text-blue-400"
                : "text-red-600 dark:text-red-400"
            }`}
          />
        </div>
        <span className="text-base font-medium text-foreground">
          {filename}
        </span>
      </div>

      {/* Action Column */}
      <div className="flex items-center gap-2">
        {filePath ? (
          <>
            <Button onClick={handleDownload} className="gap-2" size="default">
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              onClick={handleView}
              variant="outline"
              size="icon"
              title="View document"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2 text-destructive font-medium">
            <AlertCircle className="w-5 h-5" />
            <span>No {filename} Found..!</span>
          </div>
        )}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import {
  Eye,
  File,
  FileText,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

export type AcceptedFileType =
  | "image"
  | "pdf"
  | "doc"
  | "docx"
  | "xls"
  | "xlsx"
  | "csv"
  | "txt"
  | "video"
  | "audio"
  | "zip";

interface ExistingFile {
  url: string;
  name: string;
  size?: number;
  type?: string;
}

interface FileUploadProps {
  files?: File[];
  existingFiles?: ExistingFile[];
  onFilesChange?: (files: File[], name?: string) => void;
  onRemove?: (file: File | ExistingFile, name?: string) => void;
  onExistingFileRemove?: (file: ExistingFile, name?: string) => void;
  onExistingFilesChange?: (files: ExistingFile[], name?: string) => void;
  multiple?: boolean;
  showPreview?: boolean;
  acceptedTypes?: AcceptedFileType[];
  maxSize?: number;
  name?: string;
  className?: string;
  disabled?: boolean;
}

// File type mappings
const FILE_TYPE_MAP: Record<
  AcceptedFileType,
  { mime: string[]; extensions: string[] }
> = {
  image: {
    mime: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ],
    extensions: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"],
  },
  pdf: {
    mime: ["application/pdf"],
    extensions: [".pdf"],
  },
  doc: {
    mime: ["application/msword"],
    extensions: [".doc"],
  },
  docx: {
    mime: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    extensions: [".docx"],
  },
  xls: {
    mime: ["application/vnd.ms-excel"],
    extensions: [".xls"],
  },
  xlsx: {
    mime: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    extensions: [".xlsx"],
  },
  csv: {
    mime: ["text/csv"],
    extensions: [".csv"],
  },
  txt: {
    mime: ["text/plain"],
    extensions: [".txt"],
  },
  video: {
    mime: [
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "video/x-msvideo",
      "video/webm",
    ],
    extensions: [".mp4", ".mpeg", ".mov", ".avi", ".webm"],
  },
  audio: {
    mime: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/webm"],
    extensions: [".mp3", ".wav", ".ogg", ".webm"],
  },
  zip: {
    mime: [
      "application/zip",
      "application/x-zip-compressed",
      "application/x-rar-compressed",
    ],
    extensions: [".zip", ".rar"],
  },
};

export const FileUpload: React.FC<FileUploadProps> = ({
  files = [],
  existingFiles = [],
  onFilesChange,
  onRemove,
  onExistingFileRemove,
  onExistingFilesChange,
  multiple = false,
  showPreview = true,
  acceptedTypes = ["image", "pdf"],
  maxSize = 10 * 1024 * 1024, // 10MB default
  name = "",
  className = "",
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | ExistingFile | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate accept string for input from acceptedTypes
  const acceptString = acceptedTypes
    .flatMap((type) => {
      const mapping = FILE_TYPE_MAP[type];
      return mapping ? [...mapping.mime, ...mapping.extensions] : [];
    })
    .join(",");

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/"))
      return <ImageIcon className="h-8 w-8 text-primary" />;
    if (fileType === "application/pdf")
      return <FileText className="h-8 w-8 text-primary" />;
    return <File className="h-8 w-8 text-primary" />;
  };

  const isFileTypeAccepted = (file: File): boolean => {
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    return acceptedTypes.some((type) => {
      const mapping = FILE_TYPE_MAP[type];
      if (!mapping) return false;

      // Check MIME type
      const mimeMatch = mapping.mime.some(
        (mime) => fileType === mime.toLowerCase(),
      );
      if (mimeMatch) return true;

      // Check file extension
      const extensionMatch = mapping.extensions.some((ext) =>
        fileName.endsWith(ext.toLowerCase()),
      );
      return extensionMatch;
    });
  };

  const getAcceptedTypesLabel = (): string => {
    return acceptedTypes
      .map((type) => {
        switch (type) {
          case "image":
            return "images";
          case "pdf":
            return "PDFs";
          case "doc":
          case "docx":
            return "Word documents";
          case "xls":
          case "xlsx":
            return "Excel files";
          case "csv":
            return "CSV files";
          case "txt":
            return "text files";
          case "video":
            return "videos";
          case "audio":
            return "audio files";
          case "zip":
            return "ZIP files";
          default:
            return type;
        }
      })
      .join(", ");
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || disabled) return;

    const fileArray = Array.from(newFiles);

    const validFiles = fileArray.filter((file) => {
      // Check file type
      if (!isFileTypeAccepted(file)) {
        toast.error(
          `${file.name} is not an accepted file type. Please upload ${getAcceptedTypesLabel()}.`,
        );
        return false;
      }

      // Check file size
      if (file.size > maxSize) {
        toast.error(
          `${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`,
        );
        return false;
      }

      return true;
    });

    if (multiple) {
      const updatedFiles = [...files, ...validFiles];
      onFilesChange?.(updatedFiles, name);
    } else {
      // When multiple is false, clear existing files when new file is uploaded
      if (validFiles.length > 0) {
        // Clear existing files
        if (onExistingFilesChange && existingFiles.length > 0) {
          onExistingFilesChange([], name);
        }
        // Set only the new file
        onFilesChange?.([validFiles[0]], name);
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (e.target) e.target.value = "";
  };

  const removeFile = (index: number) => {
    if (disabled) return;
    const fileToRemove = files[index];
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange?.(newFiles, name);
    onRemove?.(fileToRemove, name);
  };

  const removeExistingFile = (index: number) => {
    if (disabled) return;
    const fileToRemove = existingFiles[index];

    // Call the individual remove callback
    onExistingFileRemove?.(fileToRemove, name);

    // Also update the existing files array if callback is provided
    if (onExistingFilesChange) {
      const newExistingFiles = existingFiles.filter((_, i) => i !== index);
      onExistingFilesChange(newExistingFiles, name);
    }
  };

  const openPreview = (file: File | ExistingFile) => {
    setPreviewFile(file);
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  const renderPreview = (file: File | ExistingFile) => {
    // Check if it's an existing file with URL
    if ("url" in file) {
      const fileType = file.type || "";
      const fileName = file.name.toLowerCase();

      if (
        fileType.startsWith("image/") ||
        fileName.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)
      ) {
        return (
          <img
            src={file.url}
            alt={file.name}
            className="max-h-[70vh] max-w-full rounded-lg object-contain"
          />
        );
      } else if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
        return (
          <iframe
            src={file.url}
            className="h-[70vh] w-[80vw] rounded-lg border-0"
            title={file.name}
          />
        );
      } else {
        return (
          <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
            <File size={64} />
            <p className="mt-4 text-sm font-medium">{file.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {file.type || "Unknown type"}
            </p>
          </div>
        );
      }
    }

    // Handle regular File object
    const fileUrl = URL.createObjectURL(file);

    if (file.type.startsWith("image/")) {
      return (
        <img
          src={fileUrl}
          alt={file.name}
          className="max-h-[70vh] max-w-full rounded-lg object-contain"
        />
      );
    } else if (file.type === "application/pdf") {
      return (
        <iframe
          src={fileUrl}
          className="h-[70vh] w-[80vw] rounded-lg border-0"
          title={file.name}
        />
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
          <File size={64} />
          <p className="mt-4 text-sm font-medium">{file.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {file.type || "Unknown type"}
          </p>
        </div>
      );
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Upload Zone */}
      <div
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background p-12 transition-all duration-200 hover:border-primary hover:bg-accent/5",
          isDragging && "scale-[1.02] border-primary bg-accent/10",
          disabled && "cursor-not-allowed opacity-60",
        )}
        onClick={() => !disabled && fileInputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload
          className={cn(
            "mb-4 h-14 w-14 text-muted-foreground transition-all duration-200 group-hover:text-primary",
            isDragging && "text-primary",
            "animate-in fade-in-0 zoom-in-95 duration-300",
          )}
        />
        <p className="mb-2 text-lg font-semibold text-foreground">
          {multiple
            ? "Drop files here or click to upload"
            : "Drop file here or click to upload"}
        </p>
        <p className="text-sm text-muted-foreground">
          Accepts {getAcceptedTypesLabel()} up to {formatFileSize(maxSize)}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={acceptString}
          onChange={handleFileInput}
          disabled={disabled}
        />
      </div>

      {/* Existing Files List */}
      {existingFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          {/* <p className="text-sm font-medium text-muted-foreground">
            Existing Files
          </p> */}
          {existingFiles.map((file, index) => (
            <div
              key={`existing-${index}`}
              className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-primary hover:shadow-sm"
            >
              {getFileIcon(file.type || "")}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {file.name}
                </p>
                {file.size && (
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {showPreview && (
                  <button
                    type="button"
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                    onClick={() => openPreview(file)}
                    title="Preview"
                    disabled={disabled}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => removeExistingFile(index)}
                  title="Remove"
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Files List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          {/* {existingFiles.length > 0 && (
            <p className="text-sm font-medium text-muted-foreground">
              New Files
            </p>
          )} */}
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-primary hover:shadow-sm"
            >
              {getFileIcon(file.type)}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {showPreview && (
                  <button
                    type="button"
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                    onClick={() => openPreview(file)}
                    title="Preview"
                    disabled={disabled}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => removeFile(index)}
                  title="Remove"
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewFile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm animate-in fade-in-0 duration-200"
          onClick={closePreview}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg border border-border bg-background shadow-xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Preview Header */}
            <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
              <h3 className="truncate text-base font-semibold text-foreground">
                {previewFile.name}
              </h3>
              <button
                type="button"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                onClick={closePreview}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Preview Body */}
            <div className="flex max-h-[calc(90vh-64px)] items-center justify-center overflow-auto p-6">
              {renderPreview(previewFile)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

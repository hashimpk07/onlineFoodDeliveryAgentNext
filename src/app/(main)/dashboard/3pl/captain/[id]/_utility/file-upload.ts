/**
 * Utility functions to convert API file paths to ExistingFile format
 * for use with the FileUpload component
 */

export interface ExistingFile {
  url: string;
  name: string;
  size?: number;
  type?: string;
}

/**
 * Extracts file name from a URL or path
 */
export const getFileNameFromPath = (path: string): string => {
  if (!path) return "Unknown file";

  // Remove query parameters
  const cleanPath = path.split("?")[0];

  // Get the last segment of the path
  const segments = cleanPath.split("/");
  const fileName = segments[segments.length - 1];

  return fileName ?? "Unknown file";
};

/**
 * Determines MIME type from file extension
 */
export const getMimeTypeFromFileName = (fileName: string): string => {
  const extension = fileName.toLowerCase().split(".").pop();

  const mimeTypes: Record<string, string> = {
    // Images
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",

    // Documents
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    csv: "text/csv",
    txt: "text/plain",

    // Videos
    mp4: "video/mp4",
    mpeg: "video/mpeg",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    webm: "video/webm",

    // Audio
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",

    // Archives
    zip: "application/zip",
    rar: "application/x-rar-compressed",
  };

  return mimeTypes[extension ?? ""] ?? "application/octet-stream";
};

/**
 * Converts a single file path from API to ExistingFile format
 */
export const convertPathToExistingFile = (
  filePath: string | null | undefined,
  baseUrl?: string,
): ExistingFile | null => {
  if (!filePath) return null;

  // If the path is already a full URL, use it as is
  const url = filePath.startsWith("http")
    ? filePath
    : baseUrl
      ? `${baseUrl.replace(/\/$/, "")}/${filePath.replace(/^\//, "")}`
      : filePath;

  const name = getFileNameFromPath(filePath);
  const type = getMimeTypeFromFileName(name);

  return {
    url,
    name,
    type,
  };
};

/**
 * Converts multiple file paths from API to ExistingFile array
 */
export const convertPathsToExistingFiles = (
  filePaths: (string | null | undefined)[] | null | undefined,
  baseUrl?: string,
): ExistingFile[] => {
  if (!filePaths || !Array.isArray(filePaths)) return [];

  return filePaths
    .map((path) => convertPathToExistingFile(path, baseUrl))
    .filter((file): file is ExistingFile => file !== null);
};

/**
 * Converts document object from your API response to ExistingFile format
 * Based on the provided API structure
 */
export const convertCaptainDocumentToExistingFiles = (
  document:
    | {
        iqama_file_path?: string | null;
        license_file_path?: string | null;
        rc_file_path?: string | null;
        insurance_file_path?: string | null;
        profile_pic?: string | null;
        agreement?: string | null;
      }
    | null
    | undefined,
  baseUrl?: string,
): {
  iqama?: ExistingFile[];
  license?: ExistingFile[];
  rc?: ExistingFile[];
  insurance?: ExistingFile[];
  profilePic?: ExistingFile[];
  agreement?: ExistingFile[];
} => {
  if (!document) {
    return {};
  }

  return {
    iqama: document.iqama_file_path
      ? [convertPathToExistingFile(document.iqama_file_path, baseUrl)].filter(
          (f): f is ExistingFile => f !== null,
        )
      : [],
    license: document.license_file_path
      ? [convertPathToExistingFile(document.license_file_path, baseUrl)].filter(
          (f): f is ExistingFile => f !== null,
        )
      : [],
    rc: document.rc_file_path
      ? [convertPathToExistingFile(document.rc_file_path, baseUrl)].filter(
          (f): f is ExistingFile => f !== null,
        )
      : [],
    insurance: document.insurance_file_path
      ? [
          convertPathToExistingFile(document.insurance_file_path, baseUrl),
        ].filter((f): f is ExistingFile => f !== null)
      : [],
    profilePic: document.profile_pic
      ? [convertPathToExistingFile(document.profile_pic, baseUrl)].filter(
          (f): f is ExistingFile => f !== null,
        )
      : [],
    agreement: document.agreement
      ? [convertPathToExistingFile(document.agreement, baseUrl)].filter(
          (f): f is ExistingFile => f !== null,
        )
      : [],
  };
};

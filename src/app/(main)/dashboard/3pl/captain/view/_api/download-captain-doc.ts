"use server";
import { api } from "@/lib/api.client";

export async function downloadCaptainDoc(fileUrl?: string | null) {
  if (!fileUrl) return null;

  const filename = fileUrl.split("/").pop();
  if (!filename) return null;

  try {
    const response: any = await api.get(`/3pl/captain-doc/${filename}`, {
      responseType: "arraybuffer", // Use arraybuffer instead of blob
    });

    // Return the arraybuffer data
    return {
      data: Buffer.from(response).toString("base64"),
      filename: filename,
    };
  } catch (error) {
    console.error("Download error:", error);
    return null;
  }
}

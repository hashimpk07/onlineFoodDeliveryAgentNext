/**
 * Download a base64 encoded PDF file
 * @param {string} base64Data - Base64 encoded PDF data
 * @param {string} filename - Name for the downloaded file
 */
export function downloadBase64PDF(
  base64Data: string,
  filename: string = "agreement.pdf",
) {
  try {
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      // eslint-disable-next-line security/detect-object-injection
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw new Error("Failed to download PDF");
  }
}

/**
 * Open a base64 encoded PDF in a new tab
 * @param {string} base64Data - Base64 encoded PDF data
 */
export function openBase64PDF(base64Data: string) {
  try {
    const dataUri = `data:application/pdf;base64,${base64Data}`;
    window.open(dataUri, "_blank");
  } catch (error) {
    console.error("Error opening PDF:", error);
    throw new Error("Failed to open PDF");
  }
}

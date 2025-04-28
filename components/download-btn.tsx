"use client";

import { Button } from "@nextui-org/button";
import { Download } from "lucide-react";
import { useState } from "react";

interface DownloadBtnProps {
  srcName: string;
  srcUrl: string;
  etx: string;
}

export default function DownloadBtn({
  srcName,
  srcUrl,
  etx,
}: DownloadBtnProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);

      // Fetch the image/video as a blob
      const response = await fetch(srcUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();

      // Force content type based on file type
      const contentType = etx === "mp4" ? "video/mp4" : "image/webp";
      const fileExtension = etx === "mp4" ? "mp4" : "webp";

      // Create new blob with forced content type
      const newBlob = new Blob([blob], { type: contentType });

      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(newBlob);

      // Create temporary anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${srcName}.${fileExtension}`;

      // Programmatically click the link
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-fit dark:bg-slate-800"
      onClick={handleDownload}
      isLoading={isLoading}
    >
      {!isLoading && (
        <p className="flex items-center gap-1.5">
          <Download />
          Download
        </p>
      )}
    </Button>
  );
}

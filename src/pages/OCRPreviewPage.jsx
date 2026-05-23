import { useState } from "react";

import {
  preprocessImage,
} from "../utils/ocr/preprocessImage";

import {
  runOCR,
} from "../utils/ocr/runOCR";

export default function OCRPreviewPage() {

  const [originalSrc, setOriginalSrc] =
    useState("");

  const [processedSrc, setProcessedSrc] =
    useState("");

  const [ocrText, setOcrText] =
    useState("");

  const handleUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const image = new Image();

    const imageUrl =
      URL.createObjectURL(file);

    setOriginalSrc(imageUrl);

    image.src = imageUrl;

    image.onload = async () => {

      const processedCanvas =
        await preprocessImage(image);

      // canvas → image 변환
      const processedDataUrl =
        processedCanvas.toDataURL();

      setProcessedSrc(processedDataUrl);

      const text =
        await runOCR(processedCanvas);

      setOcrText(text);
    };
  };

  return (
    <div className="p-6 flex flex-col gap-6">

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      <div className="grid grid-cols-1 md:grid-cols-2">
        

        <div>
          <h2 className="font-bold mb-2">
            Original
          </h2>

          {originalSrc && (
            <img
              src={originalSrc}
              alt="original"
              className="border rounded"
            />
          )}
        </div>

        <div>
          <h2 className="font-bold mb-2">
            Processed
          </h2>

          {processedSrc && (
            <img
              src={processedSrc}
              alt="processed"
              className="border rounded"
            />
          )}
        </div>

      </div>

      <div>
        <h2 className="font-bold mb-2">
          OCR Result
        </h2>

        <pre
          className="
            bg-[var(--color-bg)]
            text-[var(--color-text)]
            p-4
            rounded
            overflow-auto
          "
        >
          {ocrText}
        </pre>
      </div>

    </div>
  );
}
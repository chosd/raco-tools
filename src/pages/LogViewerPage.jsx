import { useState } from "react";

import Layout from "../components/common/Layout";
import ImageUpload from "../components/logviewer/ImageUpload";
import ParsedLogViewer from "../components/logviewer/ParsedLogViewer";
import LoadingSpinner from "../components/common/LoadingSpinner";

import { extractTextFromImage } from "../utils/log/extractTextFromImage";
import { parseLogText } from "../utils/log/parseLogText";

export default function LogViewerPage() {

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [processedSrc, setProcessedSrc] = useState("");
  const [originalSrc, setOriginalSrc] = useState("");

  const handleUpload = async (file) => {

    setLoading(true);

    try {

      const image = new Image();

      const imageUrl =
        URL.createObjectURL(file);

      setOriginalSrc(imageUrl);

      image.src = imageUrl;

      image.onload = async () => {

        try {

          const { preprocessImage } =
            await import(
              "../utils/ocr/preprocessImage"
            );

          const processedCanvas =
            await preprocessImage(image);

          const processedDataUrl =
            processedCanvas.toDataURL();

          setProcessedSrc(
            processedDataUrl
          );

          const text =
            await extractTextFromImage(
              processedCanvas
            );

          const parsedLogs =
            parseLogText(text);

          setLogs(parsedLogs);

        } catch (err) {

          console.error("OCR ERROR:", err);
          console.error("TYPE:", typeof err);
          console.error("STRING:", String(err));

          alert("OCR 처리 실패");

        } finally {

          setLoading(false);
        }
      };

      image.onerror = () => {

        alert("이미지 로드 실패");

        setLoading(false);
      };

    } catch (err) {

      console.error("OCR ERROR:", err);
      console.error("TYPE:", typeof err);
      console.error("STRING:", String(err));

      alert("파일 처리 실패");

      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4">

        <h2 className="text-2xl font-bold">
          Log Viewer
        </h2>

        <ImageUpload onUpload={handleUpload} />

        {loading && (
          <LoadingSpinner
            text="OCR 분석 중..."
          />
        )}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
          "
        >

          <div>
            <h3 className="font-bold mb-2">
              Original
            </h3>

            {originalSrc && (
              <img
                src={originalSrc}
                alt="original"
                className="border rounded"
              />
            )}
          </div>

          <div>
            <h3 className="font-bold mb-2">
              Processed
            </h3>

            {processedSrc && (
              <img
                src={processedSrc}
                alt="processed"
                className="border rounded"
              />
            )}
          </div>

        </div>

        <div className="overflow-x-auto">
          <ParsedLogViewer logs={logs} />
        </div>

      </div>
    </Layout>
  );
}